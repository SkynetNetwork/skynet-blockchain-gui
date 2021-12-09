import Big from 'big.js';
import Unit from '../constants/Unit';
import skynetFormatter from './skynetFormatter';

export default function syntToCAT(synt: string | number | Big): string {
  return skynetFormatter(synt, Unit.SYNT)
    .to(Unit.CAT)
    .toString();
}