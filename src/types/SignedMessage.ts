/* PreparedMessage <=> SignedMessage */
export interface SignedMessage {
  tradeId: string;
  id: string;
  type: string;
  payload: unknown;
  createdAt: string;
  sender: {
    signature: string;
    publicKey: string;
  };
}
