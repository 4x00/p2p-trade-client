import { selectMyTrades } from '../redux/appSelectors';
import * as appActions from '../redux/appActions';

import { AppStore } from '../types/AppStore';
import { TradeMessage } from '../types/TradeMessage';
import { TradeMessageType } from '../types/TradeMessageType';
import { ReceivableMessage } from '../types/ReceivableMessage';

import { getHasJoined } from '../memos/getHasJoined';
import { getMessage } from '../memos/getMessage';
import { getIsTradeCreatedByMe } from '../memos/getIsTradeCreatedByMe';

import { AcceptedJoinRequests } from '../utils/AcceptedJoinRequests';
import { calcAvailableRoles } from '../memos/calcAvailableRoles';

export const createTradeMessageHandler = (
  (store: AppStore, acceptedJoinRequests: AcceptedJoinRequests) =>
  (tradeId: string, message: TradeMessage & ReceivableMessage) => {
    console.log('tradeMessageHandler', tradeId, message);
    const state = store.getState();

    const myTrades = selectMyTrades(state);
    const myTrade = myTrades.find((trade) => trade.details.id === tradeId);
    if (!myTrade) { return null; }

    if (getMessage(myTrade, message.id)) {
      return 'ack';
    }

    if (message.type === TradeMessageType.JOINED) {
      if (getIsTradeCreatedByMe(myTrade)) {
        // check 1) we have accepted this
        const jr = acceptedJoinRequests.match(
          tradeId,
          message.sender.hostname,
          message.payload.role
        );
        if (!jr) {
          console.log('tradeMessageHandler returned null as there is no matching join request', message);
          return null;
        }
        acceptedJoinRequests.remove(jr.id);
      }

      // TODO check if xmrAmount and otherAmount differ by more than EPSILON from currency prices

      // check 2) whether such role is available
      if (!calcAvailableRoles(myTrade).includes(message.payload.role)) {
        console.log('tradeMessageHandler returned null as such role is not available', message);
        return null;
      }

      // check 3) sender has not already joined (as another role)
      if (getHasJoined(myTrade, message.sender.hostname)) {
        console.log('tradeMessageHandler returned null as sender has already joined', message);
        return null;
      }
    } else
    if ([TradeMessageType.TEXT, TradeMessageType.IMAGE].includes(message.type)) {
      // check 1) sender has joined
      if (!getHasJoined(myTrade, message.sender.hostname)) {
        console.log('tradeMessageHandler returned null as sender has not joined', message);
        return null;
      }
    } else {
      return null;
    }

    store.dispatch(appActions.addOthersMessage(tradeId, message));

    return 'ack';
  }
);
