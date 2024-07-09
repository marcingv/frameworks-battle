import { setRemoteDefinitions } from '@nx/angular/mf';
import { LOADED_REMOTE_DEFINITIONS } from './loaded-remotes-definitions';

fetch('/module-federation.manifest.json')
  .then((res) => res.json())
  .then((definitions) => {
    LOADED_REMOTE_DEFINITIONS.setDefinitions(definitions);

    return setRemoteDefinitions(definitions);
  })
  .then(() => import('./bootstrap').catch((err) => console.error(err)));
