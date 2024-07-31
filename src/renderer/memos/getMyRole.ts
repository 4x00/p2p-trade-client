import { Trade } from '../types/Trade';
import { JoinedMessage } from '../types/TradeMessage';
import { TradeMessageType } from '../types/TradeMessageType';

export const getMyRole = (trade: Trade) => (
  (
    trade.chat.find((message) =>
      message.type === TradeMessageType.JOINED &&
      !message.sender
    ) as JoinedMessage
  ).payload.role
);
