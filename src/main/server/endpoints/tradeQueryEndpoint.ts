import { IncomingMessage, ServerResponse } from 'http';
import { Bridge } from '../../electron/createBridge';

export interface Bridge2 extends Bridge {
  sendAndAwaitReply(channel: 'tradeQuery', tradeId: string): Promise<unknown[]>;
}

export type TradeQueryEndpoint = (
  (req: IncomingMessage, res: ServerResponse, bridge: Bridge2) => void
);
export const tradeQueryEndpoint: TradeQueryEndpoint = async (req, res, bridge) => {
  const tradeId = req.url.match(/^\/trades\/(\S+)$/)[1];
  const [ result ] = await bridge.sendAndAwaitReply('tradeQuery', tradeId);
  res.end(JSON.stringify(result));
};
