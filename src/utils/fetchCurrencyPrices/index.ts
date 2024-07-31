import CoinGecko from 'coingecko-api';
import { Currency, FetchCurrencyPrices } from './types';
import { isDev } from '../isDev';
import { FALLBACK_CURRENCY_PRICES } from './const';

export const VS_CURRENCIES = Object.keys(FALLBACK_CURRENCY_PRICES) as Currency[];
const CoinGeckoClient = new CoinGecko();

export const fetchCurrencyPrices: FetchCurrencyPrices = async () => {
  const response = await CoinGeckoClient.simple.price({
    ids: ['monero'],
    vs_currencies: VS_CURRENCIES,
  });

  if (!response.success) {
    if (isDev) {
      if (response.code === 429) {
        console.warn('fetchCurrencyPrices: using fallback prices, got 429 from API');
        return FALLBACK_CURRENCY_PRICES;
      }
    }

    throw new Error(`fetchCurrencyPrices failed with ${JSON.stringify(response.data)}`);
  }

  const result = response.data?.monero;

  if (!result) {
    throw new Error('fetchCurrencyPrices result is false');
  }

  return result;
};
