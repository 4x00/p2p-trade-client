import fs from 'fs';
import { getMyOnionPath } from '../utils/party/getMyOnionPath';
import * as onionOps from '../utils/onionOps';

export const initMyOnion = () => {
  const myOnionPath = getMyOnionPath();
  if (!fs.existsSync(myOnionPath)) {
    console.log('Created new onion');
    onionOps.save(onionOps.genPrivKey(), myOnionPath);
  }
};
