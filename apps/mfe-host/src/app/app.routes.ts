import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import {
  WebComponentWrapper,
  WebComponentWrapperOptions,
} from '@angular-architects/module-federation-tools';

export const appRoutes: Route[] = [
  {
    path: '',
    component: NxWelcomeComponent,
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
      remoteEntry: 'http://localhost:4303/remoteEntry.js',
      exposedModule: './Module',
      elementName: 'mf1-react-element',
    } satisfies WebComponentWrapperOptions,
  },
];
