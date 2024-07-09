import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'mf-1-react',

  exposes: {
    './Module': './src/remote-entry.ts',
  },
};

export default config;
