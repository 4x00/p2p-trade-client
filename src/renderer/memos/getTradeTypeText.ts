import { TradeType } from '../types/TradeType';

const MAP = {
  [TradeType.SELL_XMR]: 'Sell',
  [TradeType.BUY_XMR]: 'Buy',
};
export const getTradeTypeText = (type: TradeType) => MAP[type];
