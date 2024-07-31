import { OtherCurrency } from './OtherCurrency';
import { TradeRole } from './TradeRole';
import { TradeType } from './TradeType';

export type JoinTradeFormView = {
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
  availableRoles: TradeRole[];
};
