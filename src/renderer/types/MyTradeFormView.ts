import { OtherCurrency } from './OtherCurrency';
import { TradeRole } from './TradeRole';
import { TradeStatus } from './TradeStatus';
import { TradeType } from './TradeType';

export type MyTradeFormView = {
  url: string;
  id: string;
  status: TradeStatus;
  myRole: TradeRole;

  title: string;
  description: string;
  type: TradeType;
  monero: {
    min?: string;
    max?: string;
    amount?: string;
  };
  marketPricePercent: string;
  other: {
    min?: string;
    max?: string;
    amount?: string;
    currency: OtherCurrency;
  };
  escrowFee: {
    percent: string;
    flat: string;
  };
};
