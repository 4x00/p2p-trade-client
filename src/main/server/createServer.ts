import http from 'node:http';

import { createListener } from './createListener';
import { getPort } from './getPort';
import { Bridge } from '../electron/createBridge';

const KEEP_ALIVE_TIMEOUT = 30 * 1000;

export type CreateServer = (arg: Bridge) => Promise<void>;
export const createServer: CreateServer = (arg) => new Promise((resolve) => {
  const server = http.createServer(
    {
      keepAlive: true,
      keepAliveTimeout: KEEP_ALIVE_TIMEOUT,
    },
    createListener(arg)
  );

  server.listen(getPort(), resolve);
});
