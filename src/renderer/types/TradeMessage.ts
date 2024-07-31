import { MessageMetadata } from './MessageMetadata';
import { ReceivableMessage } from './ReceivableMessage';
import { TradeMessageType } from './TradeMessageType';
import { TradeRole } from './TradeRole';

export interface SendableMessage {
  ackedBy: string[];
}
export interface OthersReadableMessage {
  readBy: string[];
}
export interface MyReadableMessage {
  read: boolean;
  readAcked: boolean;
}
export interface TradeMessageBase {
  type: TradeMessageType;
  payload: unknown;
}

export interface TextMessageSource extends TradeMessageBase {
  type: TradeMessageType.TEXT;
  payload: string;
}
export type TextMessage = (
  MessageMetadata & TextMessageSource & SendableMessage & (OthersReadableMessage | (ReceivableMessage & MyReadableMessage))
);

export interface ImageMessageSource extends TradeMessageBase {
  type: TradeMessageType.IMAGE;
  payload: string;
}
export type ImageMessage = (
  MessageMetadata & ImageMessageSource & SendableMessage & (OthersReadableMessage | (ReceivableMessage & MyReadableMessage))
);

export interface JoinedMessageSource extends TradeMessageBase  {
  type: TradeMessageType.JOINED;
  payload: {
    role: TradeRole;
    xmrAddress: string;
    xmrAmount?: number;
    otherAmount?: number; // otherAmount is added here because a price-lock can be derived from it
  };
}
export type JoinedMessage = (
  MessageMetadata & JoinedMessageSource & SendableMessage & Partial<ReceivableMessage>
);

export type TradeMessageSourceMe = Partial<MessageMetadata> & (TextMessageSource | ImageMessageSource | JoinedMessageSource);
export type TradeMessageSourceOthers = TradeMessageSourceMe & ReceivableMessage & MessageMetadata;
export type TradeMessage = TextMessage | ImageMessage | JoinedMessage;
