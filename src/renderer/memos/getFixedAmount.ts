import { Trade } from '../types/Trade';
import { JoinedMessage } from '../types/TradeMessage';
import { TradeMessageType } from '../types/TradeMessageType';

export const getFixedAmount = (trade: Trade) => {
  const message = (
    trade.chat.find((message) =>
      message.type === TradeMessageType.JOINED &&
      message.payload.xmrAmount &&
      message.payload.otherAmount
    )
  ) as JoinedMessage;

  if (!message) { return; }
  return { xmr: message.payload.xmrAmount, other: message.payload.otherAmount };
};
