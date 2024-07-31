import { getMessage } from '../../memos/getMessage';
import { AckMessageAction } from '../../types/AppAction';
import { AppState } from '../../types/AppState';
import { SendableMessage } from '../../types/TradeMessage';

export const ackMessageCase = (state: AppState, action: AckMessageAction) => {
  const { tradeId, messageId, receiver } = action.payload;

  const myTrade = state
    .myTrades
    .find((trade) => trade.details.id === tradeId);

  if (myTrade) {
    const message = getMessage(myTrade, messageId);
    (message as SendableMessage).ackedBy.push(receiver);
  } else {
    console.warn('createAppReducer: no trade');
  }
};
