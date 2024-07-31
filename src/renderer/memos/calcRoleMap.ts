import { ReceivableMessage } from '../types/ReceivableMessage';
import { Trade } from '../types/Trade';
import { TradeMessageType } from '../types/TradeMessageType';
import { TradeRole } from '../types/TradeRole';

const findJoiner = (
  trade: Trade,
  role: TradeRole,
  myOnionHostname: string,
) => {
  const message = (
    trade.chat.find((message) => (
      message.type === TradeMessageType.JOINED &&
      message.payload.role === role
    ))
  );

  if (!message) { return; }

  return (
    (message as ReceivableMessage).sender
      ? (message as ReceivableMessage).sender.hostname
      : myOnionHostname
  );
};

type CalcRoleMap = (trade: Trade, myOnionHostname: string) => { [role in TradeRole]: string | undefined; };
export const calcRoleMap: CalcRoleMap = (trade, myOnionHostname) => ({
  [TradeRole.ESCROW]: findJoiner(trade, TradeRole.ESCROW, myOnionHostname),
  [TradeRole.XMR_SELLER]: findJoiner(trade, TradeRole.XMR_SELLER, myOnionHostname),
  [TradeRole.XMR_BUYER]: findJoiner(trade, TradeRole.XMR_BUYER, myOnionHostname),
});
