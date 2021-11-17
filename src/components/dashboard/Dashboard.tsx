import { shell } from 'electron';
import React from 'react';
import styled from 'styled-components';
import { Route, Switch, useRouteMatch } from 'react-router';
import { AppBar, Toolbar, Drawer, Divider } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {
  DarkModeToggle,
  LocaleToggle,
  Flex,
  Logo,
  ToolbarSpacing,
} from '@skynet/core';
import { defaultLocale, locales } from '../../config/locales';
import Wallets from '../wallet/Wallets';
import FullNode from '../fullNode/FullNode';
import Plot from '../plot/Plot';
import Farm from '../farm/Farm';
import Pool from '../pool/Pool';
import Logs from '../logs/Logs';
import Settings from '../settings/Settings';
import Block from '../block/Block';
import DashboardSideBar from './DashboardSideBar';
import { DashboardTitleTarget } from './DashboardTitle';
import TradeManager from '../trading/TradeManager';
import BackupCreate from '../backup/BackupCreate';
import { render } from 'react-dom';

const StyledRoot = styled(Flex)`
  height: 100%;
  // overflow: hidden;
`;

const StyledAppBar = styled(AppBar)`
  background-color: ${({ theme }) =>
    theme.palette.type === 'dark' ? '#424242' : 'white'};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  width: ${({ theme }) => `calc(100% - ${theme.drawer.width})`};
  margin-left: ${({ theme }) => theme.drawer.width};
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
`;

const StyledDrawer = styled(Drawer)`
  z-index: ${({ theme }) => theme.zIndex.drawer + 2};
  width: ${({ theme }) => theme.drawer.width};
  flex-shrink: 0;

  > div {
    width: ${({ theme }) => theme.drawer.width};
  }
`;

const StyledBody = styled(Flex)`
  min-width: 0;
`;

const Bold = styled.section`
  font-weight: bold;
`;

const StyledBrandWrapper = styled(Flex)`
  height: 64px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  // border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const StyledBottomBar = styled(Flex)`
  // height: 16px;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
  flex-shrink: 0;
  position: fixed;
  bottom: 0px;
  background-color: #424242;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  border-top: 1px solid #595959;
  color: #c8c8c8;
  place-content: flex-end;
  padding-right: 8px;
  font-size: 0.9em;
`;

const osu = require('node-os-utils');
const cpu = osu.cpu;
const ram = osu.mem;
const https = require('https');
const electron = require("electron");
const app = electron.app || electron.remote.app;
const version = app.getVersion();

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      severity: "info",
      last_version: "Check..",
      link: "No-link",
      timerID: 0,
      timerID2: 0,
      cpu_usage: "0.0",
      ram_usage: "0.0"
    };
  }

  updateClick = (event) => {
    if ( this.state.severity === 'warning') {
      shell.openExternal("https://github.com/SkynetNetwork/skynet-blockchain/releases");
    }
  }

  updateServerStatus() {
    cpu.usage().then(cpuPercentage => {
      //console.log(cpuPercentage) // Ex. 10.38
      this.setState({cpu_usage: cpuPercentage});
    });
    ram.info().then(info => {
      // console.log(info)
      this.setState({ram_usage: info.usedMemPercentage});
    })
  }

  checkUpdate() {
    console.log('AppVersion:',version);

    https.get(
      'https://skynet-network.org/last_update.json', (resp) =>{
        let data = '';
        resp.on('data', (chunk) =>{
          data += chunk;
        });
        resp.on('end', () =>{
          var respParsed = JSON.parse(data);
          if (respParsed.version == version) {
            this.setState({severity: 'info'});
            this.setState({last_version: 'No updates available'});
          } else {
            this.setState({severity: 'warning'});
            this.setState({last_version: 'Update available!'});
          }
        });
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
  }

  componentWillUnmount() {
    clearInterval(this.state.timerID);  
    clearInterval(this.state.timerID2);  
  }

  componentDidMount() {
    let tID = setInterval(() => this.checkUpdate(), 300000); // check every 5 mins
    let tID2 = setInterval(() => this.updateServerStatus(), 5000); // check every 5 secs
    this.setState({timerID: tID});
    this.setState({timerID2: tID2});
    this.checkUpdate();
    this.updateServerStatus();
  }

  render() {
    return (
      <StyledRoot>
        <BackupCreate />
        <StyledAppBar position="fixed" color="transparent" elevation={0}>
          <Toolbar>
            <DashboardTitleTarget />
            <Flex flexGrow={1} />
            <LocaleToggle locales={locales} defaultLocale={defaultLocale} />
            <Alert style={{cursor:'pointer'}} severity={this.state.severity} onClick={this.updateClick}>{this.state.last_version}</Alert>
          </Toolbar>
        </StyledAppBar>
        <StyledDrawer variant="permanent">
          <StyledBrandWrapper>
            <Logo width={2 / 3} />
          </StyledBrandWrapper>
          <Divider />
          <DashboardSideBar />
        </StyledDrawer>
        <StyledBottomBar variant="permanent"><Bold>-| CPU:</Bold> {this.state.cpu_usage}<Bold>% | RAM:</Bold> {this.state.ram_usage}<Bold>% | </Bold>- Skynet v{version}</StyledBottomBar>
        <StyledBody flexDirection="column" flexGrow={1}>
          <ToolbarSpacing />
          <Switch>
            <Route path={`/dashboard`} exact>
              <FullNode />
            </Route>
            <Route path={`/dashboard/block/:headerHash`} exact>
              <Block />
            </Route>
            <Route path={`/dashboard/wallets`}>
              <Wallets />
            </Route>
            <Route path={`/dashboard/plot`}>
              <Plot />
            </Route>
            <Route path={`/dashboard/farm`}>
              <Farm />
            </Route>
            <Route path={`/dashboard/pool`}>
              <Pool />
            </Route>
            <Route path={`/dashboard/logs`}>
              <Logs />
            </Route>
            <Route path={`/dashboard/trade`}>
              <TradeManager />
            </Route>
            <Route path={`/dashboard/settings`}>
              <Settings />
            </Route>
          </Switch>
        </StyledBody>
      </StyledRoot>
  );}
}
