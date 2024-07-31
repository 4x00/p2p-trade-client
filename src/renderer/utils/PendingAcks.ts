import { TradeMessage } from '../types/TradeMessage';

export interface PendingAck {
  tradeId: string;
  message: TradeMessage;
  receiver: string;
}

export class PendingAcks {
  array: PendingAck[] = [];

  add(ack: PendingAck) {
    this.array.push(ack);
  }

  has(ack: Omit<PendingAck, 'tradeId'>) {
    return this.array.some((entry) => (
      entry.message.id === ack.message.id &&
      entry.receiver === ack.receiver
    ));
  }

  remove(ack: Omit<PendingAck, 'tradeId'>) {
    this.array = this.array.filter((entry) => !(
      entry.message.id === ack.message.id &&
      entry.receiver === ack.receiver
    ));
  }
}
