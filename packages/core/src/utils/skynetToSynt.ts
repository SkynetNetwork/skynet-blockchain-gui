import Big from 'big.js';
import Unit from '../constants/Unit';
import skynetFormatter from './skynetFormatter';

export default function skynetToSynt(skynet: string | number | Big): number {
  return skynetFormatter(skynet, Unit.SKYNET)
    .to(Unit.SYNT)
    .toNumber();
}