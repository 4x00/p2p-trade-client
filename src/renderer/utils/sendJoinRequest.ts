import { MessageMetadata } from '../types/MessageMetadata';
import { JoinRequestMessageSource } from '../types/ServerMessage';
import { JoinedMessageSource } from '../types/TradeMessage';

type SendJoinRequest = (
  url: string,
  jrm: JoinRequestMessageSource & MessageMetadata,
  jm: JoinedMessageSource & MessageMetadata,
) => Promise<boolean>;
export const sendJoinRequest: SendJoinRequest = async (url, jrm, jm) => {
  const hostname = url.split('/')[0];
  const tradeId = url.split('/').pop();

  const jrRes = await signAndSendMyMessage(hostname, tradeId, jrm);
  if (jrRes !== true) {
    return false;
  }

  const jRes = await signAndSendMyMessage(hostname, tradeId, jm);
  if (jRes !== 'ack') {
    return false;
  }

  return true;
};
