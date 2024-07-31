import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import { getInstance } from './src/main/utils/getInstance';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

export const plugins = [
  ...(
    getInstance() === 0
      ? [
        new ForkTsCheckerWebpackPlugin({
          logger: 'webpack-infrastructure',
        })
      ]
      : []
  ),
];
