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
    path: 'tic-tac-toe',
    component: FrameworksCompareLayoutComponent,
    children: [
      // {
      //   path: '',
      //   outlet: 'angular-outlet',
      //   loadChildren: () =>
      //     loadRemoteModule('investment-calculator-angular', './Routes').then(
      //       (m) => m.remoteRoutes
      //     ),
      // },
      {
        path: '',
        outlet: 'react-outlet',
        component: WebComponentWrapper,
        data: {
          type: 'module',
          remoteEntry: `${
            LOADED_REMOTE_DEFINITIONS.getDefinitions()['tic-tac-toe-react']
          }/tic-tac-toe-react-assets/remoteEntry.js`,
          exposedModule: './Module',
          elementName: 'tic-tac-toe-react-app-element',
        } satisfies WebComponentWrapperOptions,
      },
    ],
  },
  {
    path: 'investment-calculator',
    component: FrameworksCompareLayoutComponent,
    children: [
      {
        path: '',
        outlet: 'angular-outlet',
        loadChildren: () =>
          loadRemoteModule('investment-calculator-angular', './Routes').then(
            (m) => m.remoteRoutes
          ),
      },
      {
        path: '',
        outlet: 'react-outlet',
        component: WebComponentWrapper,
        data: {
          type: 'module',
          remoteEntry: `${
            LOADED_REMOTE_DEFINITIONS.getDefinitions()[
              'investment-calculator-react'
            ]
          }/investment-calculator-react-assets/remoteEntry.js`,
          exposedModule: './Module',
          elementName: 'investment-calculator-react-app-element',
        } satisfies WebComponentWrapperOptions,
      },
    ],
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
          remoteEntry: `${
            LOADED_REMOTE_DEFINITIONS.getDefinitions()['styling-react']
          }/styling-react-assets/remoteEntry.js`,
          exposedModule: './Module',
          elementName: 'styling-react-app-element',
        } satisfies WebComponentWrapperOptions,
      },
    ],
  },
  {
    path: 'mf-1-react',
    component: WebComponentWrapper,
    data: {
      type: 'module',
      // remoteEntry: 'http://localhost:4300/remoteEntry.js',
      remoteEntry: `${
        LOADED_REMOTE_DEFINITIONS.getDefinitions()['mf-1-react']
      }/remoteEntry.js`,
      exposedModule: './Module',
      elementName: 'mf1-react-element',
    } satisfies WebComponentWrapperOptions,
  },
];
