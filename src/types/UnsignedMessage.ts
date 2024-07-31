export interface UnsignedMessage {
  tradeId: string;
  id: string;
  type: string;
  payload: unknown;
  createdAt: string;
}
