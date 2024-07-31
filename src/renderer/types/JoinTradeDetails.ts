import { OtherCurrency } from './OtherCurrency';
import { TradeRole } from './TradeRole';
import { TradeType } from './TradeType';

export type JoinTradeDetails = {
  id: string;
  title: string;
  description: string;
  type: TradeType;
  monero: {
    min: number;
    max: number;
  };
  marketPricePercent: number;
  other: {
    min: number;
    max: number;
    currency: OtherCurrency;
  };
  escrowFee: {
    percent: number;
    flat: number;
  };
  createdAt: string;
  availableRoles: TradeRole[];
};
