import { getMessage } from '../../memos/getMessage';
import { ReadMessageAction } from '../../types/AppAction';
import { AppState } from '../../types/AppState';
import { OthersReadableMessage } from '../../types/TradeMessage';

export const readMessageCase = (state: AppState, action: ReadMessageAction) => {
  const { tradeId, messageId, receiver } = action.payload;

  const myTrade = state
    .myTrades
    .find((trade) => trade.details.id === tradeId);

  if (myTrade) {
    const message = getMessage(myTrade, messageId);
    (message as OthersReadableMessage).readBy.push(receiver);
  } else {
    console.warn('createAppReducer: no trade');
  }
};
