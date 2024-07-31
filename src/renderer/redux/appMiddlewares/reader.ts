
import { Middleware } from '@reduxjs/toolkit';
import * as appActions from '../appActions';
import { AppState } from '../../types/AppState';
import { PendingAcks } from '../../utils/PendingAcks';
import { calcReadableMessages } from '../../memos/calcReadableMessages';
import { ServerMessageType } from '../../types/ServerMessageType';
import { MarkAsReadMessage } from '../../types/ServerMessage';
import { genId } from '../../utils/genId';
import { genNow } from '../../utils/genNow';

const READ_RETRY = 12 * 1000;

type CreateMarkAsReadMessage = (arg: { tradeId: string; messageId: string }) => MarkAsReadMessage;
const createMarkAsReadMessage: CreateMarkAsReadMessage = ({ tradeId, messageId }) => ({
  id: genId(),
  createdAt: genNow(),
  type: ServerMessageType.MARK_AS_READ,
  payload: { tradeId, messageId }
});

export const reader: Middleware<object, AppState> = (store) => {
  const pendingAcks = new PendingAcks();
  const updatePendingAcks = () => {
    calcReadableMessages(store.getState())
      .filter((ack) => !pendingAcks.has(ack))
      .forEach((ack) => {
        pendingAcks.add(ack);

        const tryToAckRead = () => {
          console.log('Trying to ack read', ack);
          const startTime = Date.now();

          const markAsReadMessage = createMarkAsReadMessage({
            tradeId: ack.tradeId,
            messageId: ack.message.id,
          });
          signAndSendMyMessage(ack.receiver, ack.tradeId, markAsReadMessage).then((result) => {
              if (result === 'ack') {
                store.dispatch(appActions.ackMessageRead({
                  tradeId: ack.tradeId,
                  messageId: ack.message.id,
                  receiver: ack.receiver,
                }));
                pendingAcks.remove(ack);
              } else {
                const now = Date.now();
                const delay = Math.max((startTime + READ_RETRY) - now, 0);
                setTimeout(tryToAckRead, delay);
              }
            });
        };
        tryToAckRead();
      });
  };
  updatePendingAcks();

  return (next) => (action) => {
    const result = next(action);
    updatePendingAcks();
    return result;
  };
};
