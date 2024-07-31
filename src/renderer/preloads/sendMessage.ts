import { UnsignedMessage } from '../../types/UnsignedMessage';

declare global {
  const sendMessage: (
    hostname: string,
    tradeId: string,
    message: Omit<UnsignedMessage, 'tradeId'>,
  ) => Promise<unknown>;
}
