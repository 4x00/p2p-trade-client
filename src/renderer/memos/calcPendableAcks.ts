import { selectMyTrades } from '../redux/appSelectors';
import { AppState } from '../types/AppState';
import { ReceivableMessage } from '../types/ReceivableMessage';
import { SendableMessage } from '../types/TradeMessage';
import { PendingAck } from '../utils/PendingAcks';
import { calcJoinedPartyHostnames } from './calcJoinedPartyHostnames';

type CalcAckables = (state: AppState) => PendingAck[];
export const calcPendableAcks: CalcAckables = (state) => (
  selectMyTrades(state).map((trade) => (
    calcJoinedPartyHostnames(trade).map((receiver) => (
      trade
        .chat
        .filter((message) => ((message as SendableMessage).ackedBy))
        .filter((message) => !(message as SendableMessage).ackedBy.includes(receiver))
        .filter((message) => !(
          (message as ReceivableMessage).sender &&
          ((message as ReceivableMessage).sender.hostname === receiver)
        ))
        .map((message) => ({ tradeId: trade.details.id, message, receiver }))
    ))
  )).flat(Infinity) as PendingAck[]
);
