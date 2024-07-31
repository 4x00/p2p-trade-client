import { MessageMetadata } from './MessageMetadata';
import { ReceivableMessage } from './ReceivableMessage';
import { ServerMessageType } from './ServerMessageType';
import { TradeRole } from './TradeRole';

export interface ServerMessageBase {
  type: ServerMessageType;
  payload: unknown;
}

export interface JoinRequestMessageSource extends ServerMessageBase {
  type: ServerMessageType.JOIN_REQUEST;
  payload: {
    role: TradeRole;
  };
}
export type JoinRequestMessage = JoinRequestMessageSource & MessageMetadata & Partial<ReceivableMessage>;

export interface MarkAsReadMessageSource extends ServerMessageBase {
  type: ServerMessageType.MARK_AS_READ;
  payload: {
    tradeId: string;
    messageId: string;
  };
}
export type MarkAsReadMessage = MarkAsReadMessageSource & MessageMetadata & Partial<ReceivableMessage>;

export type ServerMessageSource = JoinRequestMessageSource | MarkAsReadMessageSource;
export type ServerMessage = JoinRequestMessage | MarkAsReadMessage;
