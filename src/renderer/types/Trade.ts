import { TradeDetails } from './TradeDetails';
import { TradeMessage } from './TradeMessage';

export interface Trade {
  details: TradeDetails;
  chat: TradeMessage[];
}
