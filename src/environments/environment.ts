// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { config } from './common';

export const environment = Object.assign({
  production: false,
  baseUrl: 'http://localhost:8080/' // mettre ici quand serveur l'adresse du serveur
}, config); //  mettre le chemin réel ex : http:/192... ou http:// DESKTOPN5-EX3

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
