import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'investment-calculator-angular',
  exposes: {
    './Routes':
      'apps/investment-calculator-angular/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
