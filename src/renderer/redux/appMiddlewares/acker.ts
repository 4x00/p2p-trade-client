import { Middleware } from '@reduxjs/toolkit';
import * as appActions from '../appActions';
import { AppState } from '../../types/AppState';
import { PendingAcks } from '../../utils/PendingAcks';
import { calcPendableAcks } from '../../memos/calcPendableAcks';
import { ReceivableMessage } from '../../types/ReceivableMessage';
import { pruneMessage } from '../../utils/pruneMessage';

const ACK_RETRY = 12 * 1000;

export const acker: Middleware<object, AppState> = (store) => {
  const pendingAcks = new PendingAcks();
  const updatePendingAcks = () => {
    calcPendableAcks(store.getState())
      .filter((ack) => !pendingAcks.has(ack))
      .forEach((ack) => {
        pendingAcks.add(ack);

        const tryToAck = () => {
          console.log('Trying to ack', ack);
          const startTime = Date.now();

          const send = (
            (ack.message as ReceivableMessage).sender
              ? sendMessage
              : signAndSendMyMessage
          );
          send(ack.receiver, ack.tradeId, pruneMessage(ack.message)).then((result) => {
              if (result === 'ack') {
                store.dispatch(appActions.ackMessage({
                  tradeId: ack.tradeId,
                  messageId: ack.message.id,
                  receiver: ack.receiver,
                }));
                pendingAcks.remove(ack);
              } else {
                const now = Date.now();
                const delay = Math.max((startTime + ACK_RETRY) - now, 0);
                setTimeout(tryToAck, delay);
              }
            });
        };
        tryToAck();
      });
  };
  updatePendingAcks();

  return (next) => (action) => {
    const result = next(action);
    updatePendingAcks();
    return result;
  };
};
