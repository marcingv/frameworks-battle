import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'countdown-game-angular',
  exposes: {
    './Routes':
      'apps/countdown-game-angular/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
