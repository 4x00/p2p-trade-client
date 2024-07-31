import { PreparedMessage } from '../../types/PreparedMessage';

export type ReceivableMessage = Pick<PreparedMessage, 'sender'>;
