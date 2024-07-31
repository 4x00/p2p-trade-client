import { useEffect, useState } from 'react';
import { CurrencyPriceMap } from '../../utils/fetchCurrencyPrices/types';
import { fetchSyncedCurrencyPrices } from '../utils/fetchSyncedCurrencyPrices';
import { useRefreshWindow } from './useRefreshWindow';
import { createCancelablePromise } from '../utils/createCancelablePromise';

export const useCurrencyPrices = () => {
  const [currencyPrices, setCurrencyPrices] = useState<CurrencyPriceMap | null | undefined>();
  const window = useRefreshWindow();
  useEffect(() => {
    const [res, cancel] = createCancelablePromise(() => fetchSyncedCurrencyPrices());
    res
      .then((r) => {
        setCurrencyPrices(r);
      })
      .catch((e) => {
        if (e.code !== DOMException.ABORT_ERR) {
          throw e;
        }
      });

    return () => { cancel(); };
  }, [window]);

  return currencyPrices;
};
