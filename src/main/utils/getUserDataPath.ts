import { argv } from './argv';
import path from 'path';

export const getUserDataPath = () => (
  argv.userDataPath
    ? (
      path.isAbsolute(argv.userDataPath)
        ? argv.userDataPath
        : path.join(process.cwd(), argv.userDataPath)
    )
    : undefined
);
