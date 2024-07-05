import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import {
  WebComponentWrapper,
  WebComponentWrapperOptions,
} from '@angular-architects/module-federation-tools';
import { LOADED_REMOTE_DEFINITIONS } from '../loaded-remotes-definitions';
import { FrameworksCompareLayoutComponent } from './frameworks-compare-layout/frameworks-compare-layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: NxWelcomeComponent,
  },
  {
    path: 'styling',
    component: FrameworksCompareLayoutComponent,
    children: [
      {
        path: '',
        outlet: 'angular-outlet',
        loadChildren: () =>
          loadRemoteModule('styling-angular', './Routes').then(
            (m) => m.remoteRoutes
          ),
      },
      {
        path: '',
        outlet: 'react-outlet',
        component: WebComponentWrapper,
        data: {
          type: 'module',
          // remoteEntry: 'http://localhost:4303/remoteEntry.js',
          remoteEntry: `${
            LOADED_REMOTE_DEFINITIONS.getDefinitions()['mf-1-react']
          }/remoteEntry.js`,
          exposedModule: './Module',
          elementName: 'mf1-react-element',
        } satisfies WebComponentWrapperOptions,
      },
    ],
  },
  {
    path: 'styling-angular',
    loadChildren: () =>
      loadRemoteModule('styling-angular', './Routes').then(
        (m) => m.remoteRoutes
      ),
  },
  {
    path: 'mf-1-react',
    component: WebComponentWrapper,
    data: {
      type: 'module',
      // remoteEntry: 'http://localhost:4303/remoteEntry.js',
      remoteEntry: `${
        LOADED_REMOTE_DEFINITIONS.getDefinitions()['mf-1-react']
      }/remoteEntry.js`,
      exposedModule: './Module',
      elementName: 'mf1-react-element',
    } satisfies WebComponentWrapperOptions,
  },
];
