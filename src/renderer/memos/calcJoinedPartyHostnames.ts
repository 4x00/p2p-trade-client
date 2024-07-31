import { ReceivableMessage } from '../types/ReceivableMessage';
import { Trade } from '../types/Trade';
import { TradeMessageType } from '../types/TradeMessageType';

export const calcJoinedPartyHostnames = (trade: Trade) => (
  trade
    .chat
    .filter((message) => message.type === TradeMessageType.JOINED && message.sender)
    .map((message) => (message as ReceivableMessage).sender.hostname)
);
