import { argv } from '../argv';

const DEFAULT_ONION_PATH = './tor/my-hidden-service';

export const getMyOnionPath = () => (
  argv.onionPath || DEFAULT_ONION_PATH
);
