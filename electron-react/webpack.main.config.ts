import type { Configuration } from 'webpack';
import path from 'path';

import { rules } from './webpack.rules';

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/backend/main.ts',
  // Put your normal webpack config below here
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    alias: {
      '@redux': path.resolve(__dirname, 'src/frontend/redux'),
      '@shared': path.resolve(__dirname, 'src/shared'),
    },
  },
};
