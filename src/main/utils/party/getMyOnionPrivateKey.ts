import fs from 'node:fs';
import path from 'node:path';
import { getMyOnionPath } from './getMyOnionPath';

export const getMyOnionPrivateKey = () => (
  fs.readFileSync(path.join(getMyOnionPath(), 'hs_ed25519_private_key'))
);
