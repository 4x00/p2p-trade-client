import { Trade } from '../types/Trade';
import { TradeMessageType } from '../types/TradeMessageType';

export const getHasJoined = (trade: Trade, hostname: string) => (
  trade.chat.some((message) => (
    message.type === TradeMessageType.JOINED &&
    message.sender &&
    message.sender.hostname === hostname
  ))
);
