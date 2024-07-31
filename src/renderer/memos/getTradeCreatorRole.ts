import { TradeRole } from '../types/TradeRole';
import { TradeType } from '../types/TradeType';

export const getTradeCreatorRole = (tradeType: TradeType) => (
  (tradeType === TradeType.BUY_XMR && TradeRole.XMR_BUYER) ||
  (tradeType === TradeType.SELL_XMR && TradeRole.XMR_SELLER)
);
