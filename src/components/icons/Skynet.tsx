import React from 'react';
import { SvgIcon, SvgIconProps } from '@material-ui/core';
import { ReactComponent as SKYNETIcon } from './images/skynet.svg';

export default function Keys(props: SvgIconProps) {
  return <SvgIcon component={SKYNETIcon} viewBox="0 0 150 58" {...props} />;
}
