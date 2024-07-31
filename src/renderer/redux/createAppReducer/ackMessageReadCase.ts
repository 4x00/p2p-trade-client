import { getMessage } from '../../memos/getMessage';
import { AckMessageReadAction } from '../../types/AppAction';
import { AppState } from '../../types/AppState';
import { MyReadableMessage } from '../../types/TradeMessage';

export const ackMessageReadCase = (state: AppState, action: AckMessageReadAction) => {
  const { tradeId, messageId } = action.payload;

  const myTrade = state
    .myTrades
    .find((trade) => trade.details.id === tradeId);

  if (myTrade) {
    const message = getMessage(myTrade, messageId);
    (message as MyReadableMessage).readAcked = true;
  } else {
    console.warn('createAppReducer: no trade');
  }
};
