import { Injectable } from '@angular/core';
import {Collaborateur} from './auth.domains';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs/internal/Observable';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {catchError, map, tap} from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * Collaborateur anonyme.
 *
 * @type {Collaborateur}
 */
const COLLABORATEUR_ANONYME = new Collaborateur({});

/**
 * Service de gestion de l'authentification.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Flux du collaborateur connecté. Les abonnés sont notifiés dès qu'une connexion ou une déconnexion a lieu.
   *
   * A l'initialisation, le collaborateur connecté vaut 'undefined'.
   *
   * @type {BehaviorSubject<any>}
   */
  private collaborateurConnecteSub: BehaviorSubject<Collaborateur> = new BehaviorSubject(COLLABORATEUR_ANONYME);

  constructor(private _http: HttpClient, private cookieService: CookieService) {
  }

  /**
   * Interface Observable du collaborateur connecté.
   *
   * @returns {Observable<Collaborateur>}
   */
  get collaborateurConnecteObs(): Observable<Collaborateur> {
    return this.collaborateurConnecteSub.asObservable();
  }

  /**
   * Service permettant de vérifier si un collaborateur est authentifié.
   *
   * Une requête HTTP est déclenchée pour récupérer le collaborateur connecté s'il n'est pas en cache.
   *
   * @returns {Observable<Collaborateur>}
   */
  verifierAuthentification(): Observable<Collaborateur> {
    return this.collaborateurConnecteSub.getValue().estAnonyme() ?
            this._http.get<Collaborateur>(`${environment.baseUrl}${environment.apiAuthMe}`, {withCredentials: true})
                  .pipe(
                    map(colServeur => new Collaborateur(colServeur)),
                    tap(col => this.collaborateurConnecteSub.next(col)),
                    catchError(err => of(COLLABORATEUR_ANONYME))
                  ) :     of(this.collaborateurConnecteSub.getValue())
              ;
  }

  /**
   * Connexion de l'utilisateur.
   *
   * Le serveur provoque la création du cookie AUTH-TOKEN.
   *
   * @param {string} email : email de l'utilisateur
   * @param {string} mdp : mot de passe de l'utilisation
   * @returns {Observable<Collaborateur>}
   */
  connecter(email: string, mdp: string): Observable<Collaborateur> {

    const config = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    console.log('*' + email + '*');
    console.log('*' + mdp + '*');
    console.log(`${environment.baseUrl}${environment.apiLogin}`);
    return this._http.post(`${environment.baseUrl}${environment.apiLogin}`,
    new HttpParams().set('username', email).set('password', mdp), config)
      .pipe(
        map(colServeur => new Collaborateur(colServeur)),
        tap(col => {this.collaborateurConnecteSub.next(col);
                    this.cookieService.set('col', JSON.stringify(col)); } )
      );
  }

  /* Permet de sélectionner les roles du Collaborateur
  * qui se connecte
  */

  trouverRole(): string [] {

  const c: Collaborateur = JSON.parse(this.cookieService.get('col'));
  return c.roles;

}

  /*
   * Déconnexion de l'utilisateur.
   *
   * Le serveur provoque la suppression du cookie AUTH-TOKEN.
   *
   * @returns {Observable<any>}
   */

  seDeconnecter() {

    const config = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    console.log('####seDeconnecté');
    console.log(`${environment.baseUrl}${environment.apiLogout}`);
    return this._http.post<Collaborateur>(`${environment.baseUrl}${environment.apiLogout}`, null , config)
      .pipe(
        tap(col => {this.collaborateurConnecteSub.next(COLLABORATEUR_ANONYME);
                    this.cookieService.set('col', JSON.stringify(col)); })
      );
  }
}
