import { IncomingMessage, ServerResponse } from 'http';
import getStream from 'get-stream';
import { Bridge } from '../../electron/createBridge';
import { verifySignedMessage } from '../../utils/party/verifySignedMessage';
import { SignedMessage } from '../../../types/SignedMessage';
import { PreparedMessage } from '../../../types/PreparedMessage';
import { prepareMessage } from '../../utils/party/prepareMessage';

export interface Bridge2 extends Bridge {
  sendAndAwaitReply(channel: 'tradeMessage', tradeId: string, message: PreparedMessage): Promise<unknown[]>;
}

export type TradeMessageEndpoint = (
  (req: IncomingMessage, res: ServerResponse, bridge: Bridge2) => void
);
export const tradeMessageEndpoint: TradeMessageEndpoint = async (req, res, bridge) => {
  const message = JSON.parse(await getStream(req)) as SignedMessage;
  const result = verifySignedMessage(message);
  if (result) {
    const [ result ] = await bridge.sendAndAwaitReply('tradeMessage', ...prepareMessage(message));
    res.end(JSON.stringify(result));
  } else {
    console.log('got bad sig for', message);
    res.end(JSON.stringify('badsig'));
  }
};
