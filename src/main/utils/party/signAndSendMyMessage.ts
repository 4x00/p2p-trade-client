import { UnsignedMessage } from '../../../types/UnsignedMessage';
import { signAndSendMessage } from './signAndSendMessage';
import { getMyOnionPrivateKey } from './getMyOnionPrivateKey';

let privateKey: Buffer | undefined;

export const signAndSendMyMessage = async (
  hostname: string,
  message: UnsignedMessage,
) => {
  if (!privateKey) {
    privateKey = getMyOnionPrivateKey();
  }

  return signAndSendMessage(
    hostname,
    message,
    privateKey
  );
};
