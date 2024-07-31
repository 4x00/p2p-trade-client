import { argv } from './argv';

export const getInstance = () => (
  argv.instance || 0
);
