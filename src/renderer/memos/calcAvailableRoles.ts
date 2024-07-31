import { Trade } from '../types/Trade';
import { TradeMessage } from '../types/TradeMessage';
import { TradeMessageType } from '../types/TradeMessageType';
import { TradeRole } from '../types/TradeRole';

const hasJoined = (chat: TradeMessage[], role: TradeRole) => (
  chat.some((message) => (
    message.type === TradeMessageType.JOINED &&
    message.payload.role === role
  ))
);

type CalcAvailableRoles = (trade: Trade) => TradeRole[];
export const calcAvailableRoles: CalcAvailableRoles = (trade: Trade) => [
  ...(hasJoined(trade.chat, TradeRole.ESCROW) ? [] : [TradeRole.ESCROW]),
  ...(hasJoined(trade.chat, TradeRole.XMR_SELLER) ? [] : [TradeRole.XMR_SELLER]),
  ...(hasJoined(trade.chat, TradeRole.XMR_BUYER) ? [] : [TradeRole.XMR_BUYER]),
];
