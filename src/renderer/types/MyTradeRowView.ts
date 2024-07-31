import { TradeRole } from './TradeRole';
import { TradeStatus } from './TradeStatus';

export interface MyTradeRowView {
  id: string;
  myRole: TradeRole;
  title: string;
  status: TradeStatus;
  xmrAmount: string;
  otherAmount: string;
  otherCurrency: string;
  createdAt: string;
}
