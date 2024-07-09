import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'tic-tac-toe-angular',
  exposes: {
    './Routes': 'apps/tic-tac-toe-angular/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
