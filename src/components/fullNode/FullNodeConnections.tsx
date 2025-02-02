import React from 'react';
import { Trans } from '@lingui/macro';
import { useSelector } from 'react-redux';
import { Delete as DeleteIcon } from '@material-ui/icons';
import styled from 'styled-components';
import {
  Card,
  FormatBytes,
  FormatLargeNumber,
  Loading,
  Table,
  IconButton,
} from '@skynet/core';
import { Button, Tooltip } from '@material-ui/core';
import { service_connection_types } from '../../util/service_names';
import Connection from '../../types/Connection';
import FullNodeCloseConnection from './FullNodeCloseConnection';
import type { RootState } from '../../modules/rootReducer';
import useOpenDialog from '../../hooks/useOpenDialog';
import FullNodeAddConnection from './FullNodeAddConnection';

const StyledIconButton = styled(IconButton)`
  padding: 0.2rem;
`;

const cols = [
  {
    minWidth: '200px',
    field(row: Connection) {
      return (
        <Tooltip title={row.node_id}>
          <span>{row.node_id}</span>
        </Tooltip>
      );
    },
    title: <Trans>Node ID</Trans>,
  },
  {
    field: 'peer_host',
    title: <Trans>IP address</Trans>,
  },
  {
    field(row: Connection) {
      console.log('0' + row.peer_host);
      if (row.peer_host === '127.0.0.1') {
        return 'Localhost';
      }
      else if (process.platform != 'win32') {
        const Geo = window.geoip.lookup(row.peer_host.replace(/\[/,"").replace(/]/g,""))||{country:"",region:"",city:""};
        // var national = {
        //   'CN':'🇨🇳',
        //   'US':'🇺🇸',
        //   'JP':'🇯🇵',
        //   'KR':'🇰🇷',
        //   'GB':"🇬🇧", 
        // } 
        // var find_nat = national[Geo.country];
        var emoji = require('node-emoji');

        var find_nat = emoji.get(Geo.country.toLowerCase());
        var text = `${find_nat||''} ${Geo.country} ${Geo.city}`;

        return  emoji.emojify(text,(name)=>{
          return '';
        });
      }
      else {
        const Geo = window.geoip.lookup(row.peer_host.replace(/\[/,"").replace(/]/g,""))||{country:"",region:"",city:""};
        var text = `${Geo.country} ${Geo.city}`;

        return text;
      }
    }, title: <Trans>Region</Trans>,
  },
  {
    field(row: Connection) {
      return `${row.peer_port}/${row.peer_server_port}`;
    },
    title: <Trans>Port</Trans>,
  },
  {
    field(row: Connection) {
      return (
        <>
          <FormatBytes
            value={row.bytes_written}
            unit="MiB"
            removeUnit
            fixedDecimals
          />
          /
          <FormatBytes
            value={row.bytes_read}
            unit="MiB"
            removeUnit
            fixedDecimals
          />
        </>
      );
    },
    title: <Trans>MiB Up/Down</Trans>,
  },
  {
    field(row: Connection) {
      // @ts-ignore
      return service_connection_types[row.type];
    },
    title: <Trans>Connection type</Trans>,
  },
  {
    field: (row: Connection) => <FormatLargeNumber value={row.peak_height} />,
    title: <Trans>Height</Trans>,
  },
  {
    title: <Trans>Actions</Trans>,
    field(row: Connection) {
      return (
        <FullNodeCloseConnection nodeId={row.node_id}>
          {({ onClose }) => (
            <StyledIconButton onClick={onClose} style={{color:"#ff4d4d"}}>
              <DeleteIcon />
            </StyledIconButton>
          )}
        </FullNodeCloseConnection>
      );
    },
  },
];

export default function Connections() {
  const openDialog = useOpenDialog();
  const connections = useSelector(
    (state: RootState) => state.full_node_state.connections,
  );

  function handleAddPeer() {
    openDialog(<FullNodeAddConnection />);
  }

  return (
    <Card
      title={<Trans>Connections</Trans>}
      action={
        <Button onClick={handleAddPeer} variant="outlined">
          <Trans>Connect to other peers</Trans>
        </Button>
      }
    >
      {connections ? (
        <Table cols={cols} rows={connections} />
      ) : (
        <Loading center />
      )}
    </Card>
  );
}
