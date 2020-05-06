import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RisquesVm } from './domains/RisquesVm';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DangersVm } from './domains/DangersVm';
import { UtVm } from './domains/UtVm';
import { LieuVm } from './domains/LieuVm';
import { CriticiteVm } from './domains/CriticiteVm';
import { GraviteVm } from './domains/Gravite';
import { FrequenceVm } from './domains/FrequenceVm';
import { ActivitesVm } from './domains/ActivitesVm';
import { DuerVM } from './domains/DuerVM';
import { PasVm } from './domains/PasVm';
import { Duer } from './domains/Duer';
import { Duer1 } from './domains/Duer1';
import { DuerFront } from './domains/DuerFront';

@Injectable({
  providedIn: 'root'
})



export class DataService {

  url_gdu = 'http://localhost:8080/';
  listeR: Observable<RisquesVm[]>;
  listeD: Observable<DangersVm[]>;
  listeUt: Observable<UtVm[]>;
  listeLieu: Observable<LieuVm[]>;
  listeCriticite: Observable<number[]>;
  listeGravite: Observable<GraviteVm[]>;
  listeFrequence: Observable<FrequenceVm[]>;
  listeActivite: Observable<ActivitesVm[]>;
  frequence$: Observable<FrequenceVm>;
  frequence: FrequenceVm;
  gravite$: Observable<GraviteVm>;
  gravite: GraviteVm;
  ut$: Observable<UtVm>;
  ut: UtVm;
  lieu$: Observable<LieuVm>;
  lieu: LieuVm;
  activite$: Observable<ActivitesVm>;
  activite: ActivitesVm;
  danger$: Observable<DangersVm>;
  danger: DangersVm;
  risque$: Observable<RisquesVm>;
  risque: RisquesVm;
  pas$: Observable<PasVm>;
  pas: PasVm;
  listeDuerFront: Observable<DuerFront[]>;
  listeDuerFrontParCrititicite: Observable<DuerFront[]>;
  listeDuerFrontParUt: Observable<DuerFront[]>;
  listeDuerFrontParLieu: Observable<DuerFront[]>;

  constructor(private http: HttpClient) { }


  afficherListeRisque(): Observable<RisquesVm[]> {
    this.listeR = this.http.get<RisquesVm[]>(this.url_gdu + 'risques');

    return this.listeR;

  }

  afficherListeDanger(): Observable<DangersVm[]> {
    this.listeD = this.http.get<DangersVm[]>(this.url_gdu + 'dangers');

    return this.listeD;

  }

  afficherListeUt(): Observable<UtVm[]> {
    this.listeUt = this.http.get<UtVm[]>(this.url_gdu + 'uts');

    return this.listeUt;

  }


  afficherListeUtduDuer(): Observable<UtVm[]> {
    this.listeUt = this.http.get<UtVm[]>(this.url_gdu + 'duerlut');

    return this.listeUt;

  }

  afficherListeLieu(): Observable<LieuVm[]> {
    this.listeLieu = this.http.get<LieuVm[]>(this.url_gdu + 'lieus');

    return this.listeLieu;

  }

  afficherListeLieuDansDuer(): Observable<LieuVm[]> {
    this.listeLieu = this.http.get<LieuVm[]>(this.url_gdu + 'duerllieu');

    return this.listeLieu;

  }

  afficherListeGravite(): Observable<GraviteVm[]> {
    this.listeGravite = this.http.get<GraviteVm[]>(this.url_gdu + 'gravites');

    return this.listeGravite;

  }

  afficherListeFrequence(): Observable<FrequenceVm[]> {
    this.listeFrequence = this.http.get<FrequenceVm[]>(this.url_gdu + 'frequences');
    return this.listeFrequence;

  }

  afficherListeActivite(): Observable<ActivitesVm[]> {
    this.listeActivite = this.http.get<ActivitesVm[]>(this.url_gdu + 'activites');

    return this.listeActivite;

  }

  afficherListeDuerFront(): Observable<DuerFront[]> {
    this.listeDuerFront = this.http.get<DuerFront[]>(this.url_gdu + 'duerf');

    return this.listeDuerFront;
  }

  afficherListeDuerFrontParCriticite(crit: number): Observable<DuerFront[]> {
    console.log(crit);
    this.listeDuerFrontParCrititicite = this.http.get<DuerFront[]> (this.url_gdu + 'duercc?crit=' + crit);
    return this.listeDuerFrontParCrititicite;
  }

  afficherListeDuerFrontParUt(ut: number): Observable<DuerFront[]> {
    console.log(ut);
    this.listeDuerFrontParUt = this.http.get<DuerFront[]> (this.url_gdu + 'duerut?ut=' + ut);
    return this.listeDuerFrontParUt;
  }

  afficherListeDuerFrontParLieu(lieu: number): Observable<DuerFront[]> {
    console.log(lieu);
    this.listeDuerFrontParLieu = this.http.get<DuerFront[]> (this.url_gdu + 'duerlieu?lieu=' + lieu);
    console.log(this.listeDuerFrontParLieu);
    return this.listeDuerFrontParLieu;
  }

  afficherListeCriticite(): Observable<number[]> {
    this.listeCriticite = this.http.get<number[]>(this.url_gdu + 'duerc');

    return this.listeCriticite;
  }



  creerUt(newUt: string): string {
    const urlPostUt = this.url_gdu + 'ut?nom=' + newUt;

    this.http.post(urlPostUt, {}).
      subscribe(
        (data: any) => {
          console.log(data);
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }

  modifUt(idav: number, nomap: string): string {

    const urlPostUt = this.url_gdu + 'utm?id=' + idav + '&nomap=' + nomap;

    this.http.post(urlPostUt, {}).
      subscribe(
        (data: any) => {
          console.log(data);
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }

  creerLieu(newLieu: string): string {
    const urlPostLieu = this.url_gdu + 'lieu?nom=' + newLieu;
    console.log(urlPostLieu);
    console.log(newLieu);
    this.http.post(urlPostLieu, {}).
      subscribe(
        (data: any) => {
          console.log(data);
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }

  modifLieu(idav: number, nomap: string): string {

    const urlPostLieu = this.url_gdu + 'lieum?id=' + idav + '&nomap=' + nomap;

    this.http.post(urlPostLieu, {}).
      subscribe(
        (data: any) => {
          console.log(data);
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }

  creerActivite(newActivite: string): string {
    const urlPostActivite = this.url_gdu + 'activite?nom=' + newActivite;


    this.http.post(urlPostActivite, {}).
      subscribe(
        (data: any) => {
          console.log(data);
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }

  modifActivite(idav: number, nomap: string): string {

    const urlPostActivite = this.url_gdu + 'activitem?id=' + idav + '&nomap=' + nomap;

    this.http.post(urlPostActivite, {}).
      subscribe(
        (data: any) => {
          console.log(data);
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }


  creerDanger(nouveauNomDanger: string): string {
    const urlPostDg = this.url_gdu + 'danger?nom=' + nouveauNomDanger;


    this.http.post(urlPostDg, {}).
      subscribe(
        (data: any) => {
          console.log(data);
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }

  modifDanger(idav: number, nomap: string): string {

    const urlPostDg = this.url_gdu + 'dangerm?id=' + idav + '&nomap=' + nomap;

    this.http.post(urlPostDg, {}).
      subscribe(
        (data: any) => {
          console.log(data);
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }


  trouverUt(id: number): Observable<UtVm> {
    const urlGetUt = this.url_gdu + 'ut?id=' + id;

    if (id != null) {
      this.ut$ = this.http.get<UtVm>(urlGetUt);
      return this.ut$;
    }

  }

  /*trouverUt(id: number): string {
    const urlGetUt = this.url_gdu + 'ut?id=' + id;

    if (id != null) {
    this.http.get<UtVm>(urlGetUt).subscribe
      ((param: UtVm) => {
        this.ut = new UtVm(param.id, param.nom);
        console.log('1' + this.ut.nom);
      });
    console.log('2' + this.ut.nom);
    return this.ut.nom; }

  }*/

  trouverLieu(id: number): Observable<LieuVm> {
    const urlGetLieu = this.url_gdu + 'lieu?id=' + id;
    if (id != null) {
      this.lieu$ = this.http.get<LieuVm>(urlGetLieu);

      return this.lieu$;
    }
  }

  trouverActivite(id: number): Observable<ActivitesVm> {
    const urlGetAct = this.url_gdu + 'activite?id=' + id;
    if (id != null) {
      this.activite$ = this.http.get<ActivitesVm>(urlGetAct);
      return this.activite$;
    }

  }

  trouverDanger(id: number): Observable<DangersVm> {
    const urlGetDg = this.url_gdu + 'danger?id=' + id;
    if (id != null) {
      this.danger$ = this.http.get<DangersVm>(urlGetDg);
    }
    return this.danger$;
  }

  trouverRisque(id: number): Observable<RisquesVm> {
    const urlGetRis = this.url_gdu + 'risque?id=' + id;
    if (id != null) {
      this.risque$ = this.http.get<RisquesVm>(urlGetRis);}
    return this.risque$;
  }
  trouverGravite(id: number): Observable<GraviteVm> {
    const urlGetGrav = this.url_gdu + 'gravite?id=' + id;
    if (id != null) {
    this.gravite$ = this.http.get<GraviteVm>(urlGetGrav);
    }
    return this.gravite$;
  }

  trouverFrequence(id: number): Observable<FrequenceVm>{
    const urlGetFreq = this.url_gdu + 'frequence?id=' + id;
    if (id != null) {
    this.frequence$ = this.http.get<FrequenceVm>(urlGetFreq);
    }
    return this.frequence$;
  }




  trouverPas(id: number): Observable<PasVm> {
    const urlGetPas = this.url_gdu + 'pas?id=' + id;
    if (id != null) {
    this.pas$ = this.http.get<PasVm>(urlGetPas);
    }
    return this.pas$;
  }

  creerDuer(duerCrea: Duer): string {
    const urlPostDuer = this.url_gdu + 'duer';


    this.http.post(urlPostDuer, duerCrea).
      subscribe(
        (data: any) => {
          console.log(data.id);
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }
  creerDuer1(duerCrea: Duer1): string {
    const urlPostDuer = this.url_gdu + 'duer';

    if (duerCrea != null) {
    this.http.post(urlPostDuer, duerCrea).
      subscribe(
        (data: any) => {
          console.log(data.id);
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        }); }
    return '';
  }

}
