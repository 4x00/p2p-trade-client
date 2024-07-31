import { RequestListener } from 'http';
import { Bridge } from '../electron/createBridge';
import { tradeMessageEndpoint } from './endpoints/tradeMessageEndpoint';
import { tradeQueryEndpoint } from './endpoints/tradeQueryEndpoint';

export type CreateListener = (arg: Bridge) => RequestListener;
export const createListener: CreateListener = (
  (bridge: Bridge) =>
  ((req, res) => {
    const { url, method } = req;
    console.log(method, url);

    if (method === 'GET') {
      if (url === '/ruok') {
        res.end(JSON.stringify('imok'));
        return;
      } else
      if (/^\/trades\/\S+$/.test(url)) {
        tradeQueryEndpoint(req, res, bridge);
        return;
      }
    } else
    if (method === 'POST') {
      if (url === '/trades') {
        tradeMessageEndpoint(req, res, bridge);
        return;
      }
    }

    res.statusCode = 404;
    res.end();
  })
);
