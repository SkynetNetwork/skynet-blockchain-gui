import React from 'react';
import { SvgIcon, SvgIconProps } from '@material-ui/core';
import SkynetIcon from './images/skynet.svg';

export default function Keys(props: SvgIconProps) {
  return <SvgIcon component={SkynetIcon} viewBox="0 0 150 58" {...props} />;
}
