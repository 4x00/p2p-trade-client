import { OtherCurrency } from './OtherCurrency';
import { TradeType } from './TradeType';

export interface CreateTradeFormState {
  title: string;
  description: string;
  type: TradeType;
  monero: {
    min: string;
    max: string;
  };
  marketPricePercent: string;
  other: {
    min: string;
    max: string;
    currency: OtherCurrency;
  };
  escrowFee: {
    percent: string;
    flat: string;
  };
}
