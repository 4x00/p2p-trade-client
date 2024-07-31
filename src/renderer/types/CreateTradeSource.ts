import { OtherCurrency } from './OtherCurrency';
import { TradeType } from './TradeType';

export type CreateTradeSource = {
  id?: string;
  title: string;
  description: string;
  type: TradeType;
  monero: {
    min: string | number;
    max: string | number;
  };
  marketPricePercent: string | number;
  other: {
    min: string | number;
    max: string | number;
    currency: OtherCurrency;
  };
  escrowFee: {
    percent: string | number;
    flat: string | number;
  };
  createdAt?: string;
};
