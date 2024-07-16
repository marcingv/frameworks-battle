import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'countdown-game-react',

  exposes: {
    './Module': './src/remote-entry.ts',
  },
};

export default config;
