import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';

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
];
