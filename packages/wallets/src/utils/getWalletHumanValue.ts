import type { Wallet } from '@skynet/api';
import { WalletType } from '@skynet/api';
import { syntToCATLocaleString, syntToSkynetLocaleString } from '@skynet/core';

export default function getWalletHumanValue(wallet: Wallet, value: number): string {
  return wallet.type === WalletType.CAT
    ? syntToCATLocaleString(value)
    : syntToSkynetLocaleString(value);
}
