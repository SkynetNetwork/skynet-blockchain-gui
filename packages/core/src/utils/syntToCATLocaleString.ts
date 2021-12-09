import Big from 'big.js';
import Unit from '../constants/Unit';
import skynetFormatter from './skynetFormatter';

export default function syntToCATLocaleString(synt: string | number | Big) {
  return skynetFormatter(Number(synt), Unit.SYNT)
    .to(Unit.CAT)
    .toLocaleString();
}