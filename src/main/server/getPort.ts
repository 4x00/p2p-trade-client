import { argv } from '../utils/argv';

const DEFAULT_PORT = 30380;

export const getPort = () => (
  argv.serverPort || DEFAULT_PORT
);
