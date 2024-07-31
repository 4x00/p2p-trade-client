import * as appActions from '../redux/appActions';
import { getHasJoined } from '../memos/getHasJoined';
import { selectMyTrades } from '../redux/appSelectors';
import { AppStore } from '../types/AppStore';
import { MarkAsReadMessage } from '../types/ServerMessage';

export const createMarkAsReadHandler = (
  (store: AppStore) =>
  (tradeId: string, message: MarkAsReadMessage) => {
    console.log('createMarkAsReadHandler', tradeId, message);
    const state = store.getState();

    const myTrades = selectMyTrades(state);
    const myTrade = myTrades.find((trade) => trade.details.id === tradeId);
    if (!myTrade) { return null; }

    const hasJoined = getHasJoined(myTrade, message.sender.hostname);
    if (!hasJoined) { return null; }

    store.dispatch(appActions.readMessage({
      tradeId,
      messageId: message.payload.messageId,
      receiver: message.sender.hostname,
    }));

    return 'ack';
  }
);
