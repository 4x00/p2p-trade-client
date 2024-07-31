import { UnsignedMessage } from '../../types/UnsignedMessage';

declare global {
  const signAndSendMyMessage: (
    hostname: string,
    tradeId: string,
    message: Omit<UnsignedMessage, 'tradeId'>,
  ) => Promise<unknown>;
}
