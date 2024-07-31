import { Currency } from '../types/Currency';

const CURRENCY_DIGIT_COUNTS: Record<Currency, number> = {
  aud: 2,
  btc: 8,
  eth: 8,
  eur: 2,
  gbp: 2,
  ltc: 8,
  usd: 2,
  xmr: 8,
};

export const formatCurrency = (n: number, currency: Currency) => {
  if (!CURRENCY_DIGIT_COUNTS[currency]) { return '0'; }
  return n.toFixed(CURRENCY_DIGIT_COUNTS[currency]);
};
