import Big from 'big.js';

const SYNT_PER_SKYNET = Big('1000000000000');
const BLOCKS_PER_YEAR = 1681920;
const POOL_REWARD = '0.875'; // 7 / 8
const FARMER_REWARD = '0.125'; // 1 /8

export function calculatePoolReward(height: number): Big {
  if (height === 0) {
    return SYNT_PER_SKYNET.times('21000000').times(POOL_REWARD);
  }
  if (height < 3 * BLOCKS_PER_YEAR) {
    return SYNT_PER_SKYNET.times('2').times(POOL_REWARD);
  }
  if (height < 6 * BLOCKS_PER_YEAR) {
    return SYNT_PER_SKYNET.times('1').times(POOL_REWARD);
  }
  if (height < 9 * BLOCKS_PER_YEAR) {
    return SYNT_PER_SKYNET.times('0.5').times(POOL_REWARD);
  }
  if (height < 12 * BLOCKS_PER_YEAR) {
    return SYNT_PER_SKYNET.times('0.25').times(POOL_REWARD);
  }

  return SYNT_PER_SKYNET.times('0.125').times(POOL_REWARD);
}

export function calculateBaseFarmerReward(height: number): Big {
  if (height === 0) {
    return SYNT_PER_SKYNET.times('21000000').times(FARMER_REWARD);
  }
  if (height < 3 * BLOCKS_PER_YEAR) {
    return SYNT_PER_SKYNET.times('2').times(FARMER_REWARD);
  }
  if (height < 6 * BLOCKS_PER_YEAR) {
    return SYNT_PER_SKYNET.times('1').times(FARMER_REWARD);
  }
  if (height < 9 * BLOCKS_PER_YEAR) {
    return SYNT_PER_SKYNET.times('0.5').times(FARMER_REWARD);
  }
  if (height < 12 * BLOCKS_PER_YEAR) {
    return SYNT_PER_SKYNET.times('0.25').times(FARMER_REWARD);
  }

  return SYNT_PER_SKYNET.times('0.125').times(FARMER_REWARD);
}
