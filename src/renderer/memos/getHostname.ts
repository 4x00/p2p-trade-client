import { ReceivableMessage } from '../types/ReceivableMessage';
import { Trade } from '../types/Trade';
import { TradeMessageType } from '../types/TradeMessageType';
import { TradeRole } from '../types/TradeRole';

export const getHostname = (
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
