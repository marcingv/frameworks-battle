import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'styling-angular',
  exposes: {
    './Routes': 'apps/styling-angular/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
