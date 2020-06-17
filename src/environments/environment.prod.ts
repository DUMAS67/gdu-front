import { config } from './common';

export const environment = Object.assign({
  production: true,
  baseUrl: '__BACKEND_URL__' // mettre ici l'adresse du serveur quand serveur
}, config);
