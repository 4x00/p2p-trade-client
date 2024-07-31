import { selectMyTrades } from '../redux/appSelectors';
import { AppState } from '../types/AppState';
import { ReceivableMessage } from '../types/ReceivableMessage';
import { MyReadableMessage } from '../types/TradeMessage';
import { PendingAck } from '../utils/PendingAcks';

type CalcAckables = (state: AppState) => PendingAck[];
export const calcReadableMessages: CalcAckables = (state) => (
  selectMyTrades(state).map((trade) => (
    trade
      .chat
      .filter((message) => (
        (message as MyReadableMessage).read === true &&
        (message as MyReadableMessage).readAcked === false
      ))
      .map((message) => ({
        tradeId: trade.details.id,
        receiver: (message as ReceivableMessage).sender.hostname,
        message,
      }))
  )).flat(Infinity) as PendingAck[]
);
