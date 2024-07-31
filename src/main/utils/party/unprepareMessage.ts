import { SignedMessage } from '../../../types/SignedMessage';
import { PreparedMessage } from '../../../types/PreparedMessage';

export const unprepareMessage = (tradeId: string, message: PreparedMessage): SignedMessage => ({
  tradeId,
  ...message,
  sender: {
    signature: message.sender.signature,
    publicKey: message.sender.publicKey,
  }
});
