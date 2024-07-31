import { SignedMessage } from '../../../types/SignedMessage';
import { deriveHostnameFromPubKey } from '../../../main/utils/onionOps';
import { PreparedMessage } from '../../../types/PreparedMessage';

export const prepareMessage = (message: SignedMessage): [string, PreparedMessage] => {
  const { tradeId } = message;

  return [
    tradeId,
    {
      id: message.id,
      createdAt: message.createdAt,
      type: message.type,
      payload: message.payload,
      sender: {
        hostname: deriveHostnameFromPubKey(Buffer.from(message.sender.publicKey, 'base64')),
        ...message.sender,
      }
    }
  ];
};
