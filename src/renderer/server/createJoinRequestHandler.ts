import { selectMyTrades } from '../redux/appSelectors';
import { AppStore } from '../types/AppStore';
import { JoinRequestMessage } from '../types/ServerMessage';
import { calcAvailableRoles } from '../memos/calcAvailableRoles';
import { AcceptedJoinRequests } from '../utils/AcceptedJoinRequests';
import { ReceivableMessage } from '../types/ReceivableMessage';

const JOIN_WAIT_TIMEOUT = 60 * 1000;

export const createJoinRequestHandler = (
  (store: AppStore, acceptedJoinRequests: AcceptedJoinRequests) =>
  (tradeId: string, message: JoinRequestMessage & ReceivableMessage) => {
    console.log('joinRequestHandler', tradeId, message);
    const state = store.getState();
    const myTrades = selectMyTrades(state);
    const myTrade = myTrades.find((trade) => trade.details.id === tradeId);

    if (!myTrade) { return null; }
    const isRoleAvailable = calcAvailableRoles(myTrade).includes(message.payload.role);
    if (!isRoleAvailable) { return null; }

    return new Promise((resolve) => {
      const respond = (result: boolean) => {
        if (result === true) {
          acceptedJoinRequests.add(tradeId, message);
          setTimeout(
            () => { acceptedJoinRequests.remove(message.id); },
            JOIN_WAIT_TIMEOUT
          );
        }

        resolve(result);
      };

      dispatchEvent(
        new CustomEvent<TradeJoinRequestEvent['detail']>(
          'tradejoinrequest',
          {detail: { respond, tradeId, message }}
        )
      );
    });
  }
);
