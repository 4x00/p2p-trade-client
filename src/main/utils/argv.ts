import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

type Argv = {
  onionPath?: string;
  serverPort?: number;
  userDataPath?: string;
  instance?: number;
};

export const argv = (
  yargs(
    hideBin(process.argv)
      .filter((v) => v !== '--')
  ).argv
) as Argv;
