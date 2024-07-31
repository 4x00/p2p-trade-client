/* PreparedMessage <=> SignedMessage */
export interface PreparedMessage {
  id: string;
  type: string;
  payload: unknown;
  createdAt: string;
  sender: {
    hostname: string;
    signature: string;
    publicKey: string;
  };
}
