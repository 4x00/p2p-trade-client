import { Trade } from '../types/Trade';
import { getHostname } from './getHostname';
import { getTradeCreatorRole } from './getTradeCreatorRole';

export const getTradeCreatorHostname = (trade: Trade, myOnionHostname: string) => (
  getHostname(
    trade,
    getTradeCreatorRole(trade.details.type),
    myOnionHostname
  )
);
