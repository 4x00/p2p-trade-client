import {
  MyReadableMessage,
  OthersReadableMessage,
  SendableMessage,
  TradeMessage,
} from '../types/TradeMessage';
import { UnsignedMessage } from '../../types/UnsignedMessage';

// prepare message for transmission involves removing local properties - otherwise signature will fail
export const pruneMessage = (message: TradeMessage): Omit<UnsignedMessage, 'tradeId'> => {
  const o = { ...message };
  delete (o as SendableMessage).ackedBy;
  delete (o as MyReadableMessage).read;
  delete (o as MyReadableMessage).readAcked;
  delete (o as OthersReadableMessage).readBy;
  return o;
};
