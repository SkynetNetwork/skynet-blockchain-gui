import * as React from 'react';
import DashboardTitle from '../dashboard/DashboardTitle';
import { Flex, Log, Link } from '@skynet/core';
import { Paper } from '@material-ui/core';
import styled from 'styled-components';
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import 'xterm/css/xterm.css';
import c from "ansi-colors";
import path from 'path';
import { existsSync, readFileSync } from 'fs';
import { Trans } from '@lingui/macro';
// @ts-ignore
import ScrollToBottom from 'react-scroll-to-bottom';

let term;
let terminal_version = 'v1.0.0';
const fitAddon = new FitAddon();
const PY_MAC_DIST_FOLDER = '../../../app.asar.unpacked/daemon';
const PY_WIN_DIST_FOLDER = '../../../app.asar.unpacked/daemon';
const LOGS_PATH = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'] + '/.skynet/mainnet/log/debug.log';
const fullPath = (existsSync((process.platform === 'win32') ? path.join(__dirname, PY_WIN_DIST_FOLDER) : path.join(__dirname, PY_MAC_DIST_FOLDER))) ? ((process.platform === 'win32') ? path.join(__dirname, PY_WIN_DIST_FOLDER) : path.join(__dirname, PY_MAC_DIST_FOLDER)) : path.join(__dirname, '../../../venv/bin');
const ENV_SKYNET = ((process.platform === 'win32') ? '$env:Path += ";' : 'export PATH="$PATH:') + fullPath + '"';

const StyledPaper = styled(Paper)`
  background-color: #000000;
  color: #37c3fe;
  min-width: 84%;
  /*width: 100%;*/
  height: 46vh;
  /position: fixed;*/
  bottom: 0;
  font-size:12px;
  background-color: #2b2a2a;
  border-top: 1px solid #3db6ea;
  padding-top: 4px;
  pre {
    word-break: break-all;
    white-space: pre-wrap;
    padding: ${({ theme }) => `${theme.spacing(1)}px 0`};
  }
`;
const StyledScrollToBottom = styled(ScrollToBottom)`
  width: 100%;
  height: 100%;
`;

export default class Logs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: "Empty Log...",
      logTimerID: 0
    };
  }

  // Check content of debug.log
  checkLogFile() {
    // console.log(LOGS_PATH);
    // console.log(PY_MAC_DIST_FOLDER);

    if (existsSync(LOGS_PATH)) {
      const buffer = readFileSync(LOGS_PATH);
      const logContent = buffer.toString();
      this.setState({logs: logContent});
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.logTimerID);  
  }

  componentDidMount() {
    let timerID = setInterval(() => this.checkLogFile(), 5000);
    this.checkLogFile();
    this.setState({logTimerID: timerID});
    console.log('logTimerID:' + this.state.logTimerID);

    term = new Terminal({
      convertEol: true,
      fontFamily: `'Fira Mono', monospace`,
      //fontSize: 15,
      //fontWeight: 900,
      //rows: 30,
      //cols: 80,
      //rendererType: "dom" // default is canvas
    });

    var shell = (process.platform === 'win32') ? 'powershell.exe' : 'bash';
    var pty = require('node-pty');
    var ptyProcess = pty.spawn(shell, [], {
      name: 'xterm-color',
      //cols: 80,
      //rows: 30,
      cwd: fullPath,
      env: process.env
    });

    //set path enviroment
    ptyProcess.write(ENV_SKYNET + '\r');
    ptyProcess.write('skynet -h\r');
    //write data from ptyProcess to terminal
    ptyProcess.on('data', function(data) {
      //process.stdout.write(data);
      term.write(data);
    });

    //Styling
    // term.setOption("theme", {
    //   background: "black",
    //   foreground: "white"
    // });

    // Load Fit Addon
    term.loadAddon(fitAddon);

    // Open the terminal in #xterm container
    term.open(document.getElementById("xterm"));

    // Write text inside the terminal
    term.write('Welcome to ' + c.blue('Skynet') + ' terminal console ' + terminal_version + '\r\n');
    term.write('Daemon directory: ' + c.green(fullPath) + '\r\n');

    // Make the terminal's size and geometry fit the size of #terminal-container
    term.onResize(params => {
      ptyProcess.resize(params.cols, params.rows);
    });
    fitAddon.fit();

    // Grab keys
    term.onKey(key => {
      const char = key.domEvent.key;
      if (char === "Enter") {
        ptyProcess.write('\r');
      } else if (char === "Backspace") {
        ptyProcess.write('\b');
      } else if (char === "ArrowUp") {
        ptyProcess.write('\x1b[A')
      } else if (char === "ArrowDown") {
        ptyProcess.write('\x1b[B')
      } else if (char === "ArrowRight") {
        ptyProcess.write('\x1b[C')
      } else if (char === "ArrowLeft") {
        ptyProcess.write('\x1b[D')
      } else if (term.hasSelection() && key === "�") {
        document.execCommand('copy') 
      } else {
        ptyProcess.write(char);
      }
    });

  }

  render() {

    return (
      <Flex flexDirection="column" flexGrow="1">

        <DashboardTitle>
          {/* <Link to="/dashboard/plot" color="textPrimary"> */}
            <Trans>Terminal & logs</Trans>
          {/* </Link> */}
        </DashboardTitle>

        <div id="xterm" style={{ height: "46vh", width: "100%"}} />

        <StyledPaper>
          <StyledScrollToBottom debug={false}>
            <pre>{this.state.logs}</pre>
          </StyledScrollToBottom>
        </StyledPaper>

      </Flex>
    );
  }

}
