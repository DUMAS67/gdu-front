import { config } from './common';

export const environment = Object.assign({
  production: true,
  baseUrl: 'http://localhost:8080/' // mettre ici l'adresse du serveur quand serveur
}, config);
