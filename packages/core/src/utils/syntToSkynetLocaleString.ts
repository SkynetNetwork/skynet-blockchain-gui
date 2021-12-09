import Big from 'big.js';
import Unit from '../constants/Unit';
import skynetFormatter from './skynetFormatter';

export default function syntToSkynetLocaleString(synt: string | number | Big) {
  return skynetFormatter(Number(synt), Unit.SYNT)
    .to(Unit.SKYNET)
    .toLocaleString();
}