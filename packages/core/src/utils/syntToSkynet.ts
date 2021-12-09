import Big from 'big.js';
import Unit from '../constants/Unit';
import skynetFormatter from './skynetFormatter';

export default function syntToSkynet(synt: string | number | Big): number {
  return skynetFormatter(synt, Unit.SYNT)
    .to(Unit.SKYNET)
    .toNumber();
}