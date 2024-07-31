export type Currency = 'aud' | 'btc' | 'eth' |'eur' |'gbp' |'ltc' | 'usd';
export type CurrencyPriceMap = Record<Currency, number>;
export type FetchCurrencyPrices = () => Promise<CurrencyPriceMap>;
