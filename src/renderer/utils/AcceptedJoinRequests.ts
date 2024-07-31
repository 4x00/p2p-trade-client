import { JoinRequestMessage } from '../types/ServerMessage';

interface AcceptedJoinRequest {
  tradeId: string;
  message: JoinRequestMessage;
}

export class AcceptedJoinRequests {
  array: AcceptedJoinRequest[] = [];

  add(tradeId: string, message: JoinRequestMessage) {
    this.array.push({ tradeId, message });
  }

  match(tradeId: string, hostname: string, role: string) {
    return (
      this.array.find(
        (entry) => (
          entry.tradeId === tradeId &&
          entry.message.sender.hostname === hostname &&
          entry.message.payload.role === role
        )
      )?.message
    );
  }

  remove(id: string) {
    this.array = this.array.filter((entry) => (
      entry.message.id !== id
    ));
  }
}
