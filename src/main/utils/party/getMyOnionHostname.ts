import fs from 'node:fs';
import path from 'node:path';
import { getMyOnionPath } from './getMyOnionPath';

export const getMyOnionHostname = () => (
  fs
    .readFileSync(path.join(getMyOnionPath(), 'hostname'))
    .toString()
    .trim()
);
