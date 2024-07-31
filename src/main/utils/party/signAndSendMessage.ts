import { sendMessage } from './sendMessage';
import { derivePubKeyFromPrivKey, sign } from '../onionOps';
import { UnsignedMessage } from '../../../types/UnsignedMessage';

export const signAndSendMessage = async (
  hostname: string,
  message: UnsignedMessage,
  privateKey: Buffer,
) => {
  const publicKey = derivePubKeyFromPrivKey(privateKey);

  return sendMessage(
    hostname,
    {
      ...message,
      sender: {
        signature: sign(privateKey, Buffer.from(JSON.stringify(message))).toString('base64'),
        publicKey: publicKey.toString('base64'),
      }
    }
  );
};
