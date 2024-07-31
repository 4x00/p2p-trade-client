import { SignedMessage } from '../../../types/SignedMessage';
import { verify } from '../onionOps';

const toBuf = (data: string) => Buffer.from(data, 'base64');

export const verifySignedMessage = (message: SignedMessage) => {
  const { publicKey, signature } = message.sender;

  return verify(
    toBuf(publicKey),
    Buffer.from(JSON.stringify({ ...message, sender: undefined })),
    toBuf(signature)
  );
};
