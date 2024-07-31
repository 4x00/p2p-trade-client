import { Trade } from '../types/Trade';
import { getMyRole } from './getMyRole';
import { getTradeCreatorRole } from './getTradeCreatorRole';

export const getIsTradeCreatedByMe = (trade: Trade) => (
  getMyRole(trade) === getTradeCreatorRole(trade.details.type)
);
