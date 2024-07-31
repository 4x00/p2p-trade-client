import { PreparedMessage } from '../../types/PreparedMessage';
import { AppStore } from '../types/AppStore';
import { ReceivableMessage } from '../types/ReceivableMessage';
import { JoinRequestMessage, MarkAsReadMessage } from '../types/ServerMessage';
import { ServerMessageType } from '../types/ServerMessageType';
import { TradeMessage } from '../types/TradeMessage';

import { AcceptedJoinRequests } from '../utils/AcceptedJoinRequests';
import { createJoinRequestHandler } from './createJoinRequestHandler';
import { createMarkAsReadHandler } from './createMarkAsReadHandler';
import { createTradeMessageHandler } from './createTradeMessageHandler';

export const createTradeMessageListener = (
  (store: AppStore) => {
    const acceptedJoinRequests = new AcceptedJoinRequests();
    const joinRequestHandler = createJoinRequestHandler(store, acceptedJoinRequests);
    const tradeMessageHandler = createTradeMessageHandler(store, acceptedJoinRequests);
    const markAsReadMessageHandler = createMarkAsReadHandler(store);

    return (
      (tradeId: string, message: PreparedMessage) =>
      {
        switch (message.type) {
          case ServerMessageType.JOIN_REQUEST:
            return joinRequestHandler(tradeId, message as JoinRequestMessage & ReceivableMessage);
          case ServerMessageType.MARK_AS_READ:
            return markAsReadMessageHandler(tradeId, message as MarkAsReadMessage & ReceivableMessage);
          default:
            return tradeMessageHandler(tradeId, message as TradeMessage & ReceivableMessage);
        }
      }
    );
  }
);
