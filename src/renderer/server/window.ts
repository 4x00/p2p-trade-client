import { JoinRequestMessage } from '../types/ServerMessage';

declare global {
  interface TradeJoinRequestEvent extends CustomEvent {
    type: 'tradejoinrequest';
    detail: {
      respond: (result: boolean) => void;
      tradeId: string;
      message: JoinRequestMessage;
    };
  }

  function addEventListener(type: 'tradejoinrequest', callback: TradeJoinRequestEvent, options?: AddEventListenerOptions | boolean): void;
  function dispatchEvent(event: TradeJoinRequestEvent): boolean;
  function removeEventListener(type: 'tradejoinrequest', callback: TradeJoinRequestEvent, options?: EventListenerOptions | boolean): void;
}
