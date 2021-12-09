import type Wallet from '../types/Wallet';
import WalletType from '../constants/WalletType';
import { synt_to_colouredcoin_string, synt_to_skynet_string } from './skynet';

export default function getWalletHumanValue(wallet: Wallet, value: number): string {
  return wallet.type === WalletType.CAT
    ? synt_to_colouredcoin_string(value)
    : synt_to_skynet_string(value);
}
