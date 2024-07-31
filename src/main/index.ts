import { createApp } from './electron/createApp';
import { initMyOnion } from './electron/initMyOnion';
import { createServer } from './server/createServer';

(async () => {
  initMyOnion();
  // TODO create tor process

  const bridge = await createApp();
  await createServer(bridge);

  console.log('Server and App have been started!');
})();
