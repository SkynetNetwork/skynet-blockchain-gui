import Big from 'big.js';
import Unit from '../constants/Unit';
import skynetFormatter from './skynetFormatter';

export default function catToSynt(cat: string | number | Big): string {
  return skynetFormatter(cat, Unit.CAT)
    .to(Unit.SYNT)
    .toString();
}