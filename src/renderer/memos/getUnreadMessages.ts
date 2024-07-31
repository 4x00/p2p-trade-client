import { Trade } from '../types/Trade';
import { MyReadableMessage } from '../types/TradeMessage';

export const getUnreadMessages = (trade: Trade) => (
  trade.chat.filter((message) => (message as MyReadableMessage).read === false)
);
