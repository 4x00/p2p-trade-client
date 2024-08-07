import { Trade } from '../types/Trade';
import { TradeStatus } from '../types/TradeStatus';
import { calcAvailableRoles } from './calcAvailableRoles';

export const calcTradeStatus = (trade: Trade) => (
  (calcAvailableRoles(trade).length === 0 && TradeStatus.AWAITING_XMR_SELLER_DEPOSIT) ||
  TradeStatus.AWAITING_PARTIES
);
