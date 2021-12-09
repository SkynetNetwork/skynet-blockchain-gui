import React, { useMemo } from 'react';
import { Trans } from '@lingui/macro';
import { useCurrencyCode, syntToSkynetLocaleString } from '@skynet/core';
import { useGetFarmedAmountQuery } from '@skynet/api-react';
import FarmCard from './FarmCard';

export default function FarmCardTotalSkynetFarmed() {
  const currencyCode = useCurrencyCode();
  const { data, isLoading } = useGetFarmedAmountQuery();

  const farmedAmount = data?.farmedAmount;

  const totalSkynetFarmed = useMemo(() => {
    if (farmedAmount !== undefined) {
      return (
        <>
          {syntToSkynetLocaleString(farmedAmount)}
          &nbsp;
          {currencyCode}
        </>
      );
    }
  }, [farmedAmount]);

  return (
    <FarmCard
      title={<Trans>Total Skynet Farmed</Trans>}
      value={totalSkynetFarmed}
      loading={isLoading}
    />
  );
}
