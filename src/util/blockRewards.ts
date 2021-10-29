import Big from 'big.js';

const SYNT_PER_SKYNET = Big(1000000000000); // _synt_per_skynet = 1000000000000
const BLOCKS_PER_YEAR = 1681920; // 32 * 6 * 24 * 365
const YEAR_JOLLY_BLOCKS = 1681920; // n. of blocks with 5 XNT reward every years
const HALVING_FACTOR = 2 / 5; // reward decreaser factor yrs<=10
const POOL_REWARD_MLT = 7 / 8; // 87,5% of reward
const FARMER_REWARD_MLT = 1 / 8; // 12.5% of reward
const TIMELORD_FEE_MLT = 0.1 / 100; // 0.1% of fee for block processed
const TESTNET_AIRDROP = (1000*50)+(500*51)+(250*99)+(100*306) // 130850xnt - Airdrop from testnet_09 Top500 https://skynet-network.org/news/13-testnet-09-addresses-ranking-top500
const PREFARM_AMOUNT = 5000000 + TESTNET_AIRDROP

export function calculatePoolReward(height: number): Big {
  if (height == 0) {
    return SYNT_PER_SKYNET.times(PREFARM_AMOUNT).times(POOL_REWARD_MLT);
  }
  else {
    var year = 1;
    while (true) {
      if (height < (year * BLOCKS_PER_YEAR) && height > ((year * BLOCKS_PER_YEAR) - YEAR_JOLLY_BLOCKS)) {
        return SYNT_PER_SKYNET.times(5).times(POOL_REWARD_MLT);
      }
      else if (height < (year * BLOCKS_PER_YEAR)) {
        if (year == 1) {
          return SYNT_PER_SKYNET.times(5).times(POOL_REWARD_MLT);
        }
        else if (year > 1 && year <= 10) {
          return SYNT_PER_SKYNET.times(5 - (year * HALVING_FACTOR)).times(POOL_REWARD_MLT);
        }
        else if (year > 10) {
          return SYNT_PER_SKYNET.times(0.5).times(POOL_REWARD_MLT);
        }
      }
      else {
        year += 1;
      }
    }
  }
}

export function calculateBaseFarmerReward(height: number): Big {
  if (height == 0) {
    return SYNT_PER_SKYNET.times(PREFARM_AMOUNT).times(FARMER_REWARD_MLT);
  }
  else {
    var year = 1;
    while (true) {
      if (height < (year * BLOCKS_PER_YEAR) && height > ((year * BLOCKS_PER_YEAR) - YEAR_JOLLY_BLOCKS)) {
        return SYNT_PER_SKYNET.times(5).times(FARMER_REWARD_MLT);
      }
      else if (height < (year * BLOCKS_PER_YEAR)) {
        if (year == 1) {
          return SYNT_PER_SKYNET.times(5).times(FARMER_REWARD_MLT);
        }
        else if (year > 1 && year <= 10) {
          return SYNT_PER_SKYNET.times(5 - (year * HALVING_FACTOR)).times(FARMER_REWARD_MLT);
        }
        else if (year > 10) {
          return SYNT_PER_SKYNET.times(0.5).times(FARMER_REWARD_MLT);
        }
      }
      else {
        year += 1;
      }
    }
  }
}

export function calculateBaseTimelordFee(height: number): Big {
  var year = 1;
  while (true) {
    if (height < (4608*7)) { // First week x5 timelord reward
      return SYNT_PER_SKYNET.times(5).times(TIMELORD_FEE_MLT*5);
    }
    else if (height < (year * BLOCKS_PER_YEAR)) {
      if (year == 1) {
        return SYNT_PER_SKYNET.times(5).times(TIMELORD_FEE_MLT);
      }
      else if (year > 1 && year <= 10) {
        return SYNT_PER_SKYNET.times(5 - (year * HALVING_FACTOR)).times(TIMELORD_FEE_MLT);
      }
      else if (year > 10) {
        return SYNT_PER_SKYNET.times(0.5).times(TIMELORD_FEE_MLT);
      }
    }
    else {
      year += 1;
    }
  }
}
