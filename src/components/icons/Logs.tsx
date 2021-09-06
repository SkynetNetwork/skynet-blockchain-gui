import React from 'react';
import { SvgIcon, SvgIconProps } from '@material-ui/core';
import { ReactComponent as LogIcon } from './images/log.svg';

export default function Logs(props: SvgIconProps) {
  return <SvgIcon component={LogIcon} viewBox="0 0 34 34" {...props} />;
}
