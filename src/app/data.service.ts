import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
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
import { tap } from 'rxjs/operators';
import { Ut } from './environments/Ut';
import { PasFront } from './domains/PasFront';

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

  subjectActUt: BehaviorSubject<UtVm[]>;
  listePas: Observable<PasFront[]>;
  listeCriticiteMo: Observable<number[]>;
  listePasFrontParDanger: Observable<PasFront[]>;
  listeDanger: Observable<DangersVm[]>;
  listeRisque: Observable<RisquesVm[]>;
  listeQui: Observable<string[]>;
  listePasFrontParRisque: Observable<PasFront[]>;
  listePasFrontParQui: Observable<PasFront[]>;

  constructor(private http: HttpClient) {

    let tabUtm: UtVm[] = [];
    this.subjectActUt = new BehaviorSubject(tabUtm);
    console.log(this.subjectActUt);
  }

  listeDuerFrontParCrititiciteMo: Observable<DuerFront[]>;




  afficherListeRisque(): Observable<RisquesVm[]> {
    this.listeR = this.http.get<RisquesVm[]>(this.url_gdu + 'risques');

    return this.listeR;

  }

  afficherListeDanger(): Observable<DangersVm[]> {
    this.listeD = this.http.get<DangersVm[]>(this.url_gdu + 'dangers');

    return this.listeD;

  }

  afficherListeUt(): Observable<UtVm[]> {
    this.listeUt = this.http.get<UtVm[]>(this.url_gdu + 'uts').
      pipe(
        tap(utS => {
          this.subjectActUt.next(utS);
          this.subjectActUt.forEach(sub => console.log(sub));

        })
      );

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
    this.listeDuerFrontParCrititicite = this.http.get<DuerFront[]>(this.url_gdu + 'duercc?crit=' + crit);
    return this.listeDuerFrontParCrititicite;
  }
  afficherListeDuerFrontParCriticiteMo(crit: number): Observable<DuerFront[]> {
    console.log(crit);
    this.listeDuerFrontParCrititiciteMo = this.http.get<DuerFront[]>(this.url_gdu + 'duercmo?crit=' + crit);
    return this.listeDuerFrontParCrititiciteMo;
  }


  afficherListeDuerFrontParUt(ut: number): Observable<DuerFront[]> {
    console.log(ut);
    this.listeDuerFrontParUt = this.http.get<DuerFront[]>(this.url_gdu + 'duerut?ut=' + ut);
    return this.listeDuerFrontParUt;
  }

  afficherListeDuerFrontParLieu(lieu: number): Observable<DuerFront[]> {
    console.log(lieu);
    this.listeDuerFrontParLieu = this.http.get<DuerFront[]>(this.url_gdu + 'duerlieu?lieu=' + lieu);
    console.log(this.listeDuerFrontParLieu);
    return this.listeDuerFrontParLieu;
  }




  /* trouve la liste des criticité dans les préventions existantes*/
  afficherListeCriticite(): Observable<number[]> {
    this.listeCriticite = this.http.get<number[]>(this.url_gdu + 'duerc');

    return this.listeCriticite;
  }

  /* affiche la liste des Pas avec clef du Duer*/
  afficherListePas(): Observable<PasFront[]> {

    this.listePas = this.http.get<PasFront[]>(this.url_gdu + 'passf');
    return this.listePas;
  }

  /* affiche la liste des Dangers contenu dans le pas*/
  afficherListeDangerduPas(): Observable<DangersVm[]> {
    this.listeDanger = this.http.get<DangersVm[]>(this.url_gdu + 'pasldg');

    return this.listeDanger;

  }
  /* affiche la liste des Risques contenu dans le pas*/
  afficherListeRisqueduPas(): Observable<RisquesVm[]> {
    this.listeRisque = this.http.get<RisquesVm[]>(this.url_gdu + 'paslrq');

    return this.listeRisque;

  }

  /* affiche la liste des Qui contenu dans le pas*/
  afficherListeQuiduPas(): Observable<string[]> {
    this.listeQui = this.http.get<string[]>(this.url_gdu + 'paslqui');

    return this.listeQui;

  }

  /*  afficher la liste des pas par Danger */
  afficherListePasFrontParDanger(danger: number): Observable<PasFront[]> {
    console.log(danger);
    this.listePasFrontParDanger = this.http.get<PasFront[]>(this.url_gdu + 'passfdg?id=' + danger);
    console.log(this.listePasFrontParDanger);
    return this.listePasFrontParDanger;
  }

  /*  afficher la liste des pas par Risque */
  afficherListePasFrontParRisque(rq: number): Observable<PasFront[]> {
    console.log(rq);
    this.listePasFrontParRisque = this.http.get<PasFront[]>(this.url_gdu + 'passfrq?id=' + rq);
    console.log(this.listePasFrontParRisque);
    return this.listePasFrontParRisque;
  }

  /*  afficher la liste des pas par Qui?*/
  afficherListePasFrontParQui(qui: string): Observable<PasFront[]> {
    console.log(qui);
    this.listePasFrontParQui = this.http.get<PasFront[]>(this.url_gdu + 'passfqui?nom=' + qui);
    console.log(this.listePasFrontParQui);
    return this.listePasFrontParQui;
  }

  /* trouve la liste des criticité dans les préventions à Maître en Oeuvre*/
  afficherListeCriticiteMo(): Observable<number[]> {
    this.listeCriticiteMo = this.http.get<number[]>(this.url_gdu + 'duercmos');

    return this.listeCriticiteMo;

  }


  creerUt(newUt: string): string {
    const urlPostUt = this.url_gdu + 'ut?nom=' + newUt;

    this.http.post(urlPostUt, { responseType: 'text' }).
      subscribe(
        (data: any) => {
          console.log(data);
          this.afficherListeUt().subscribe((listeUt: UtVm[]) => {
            this.subjectActUt.next(listeUt);
          });
          // indique au subject qu'une nouvelle donnée est créée
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
        (data: string) => {
          console.log(data);
          return data;
        },
        (error: string) => {
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
      this.risque$ = this.http.get<RisquesVm>(urlGetRis);
    }
    return this.risque$;
  }
  trouverGravite(id: number): Observable<GraviteVm> {
    const urlGetGrav = this.url_gdu + 'gravite?id=' + id;
    if (id != null) {
      this.gravite$ = this.http.get<GraviteVm>(urlGetGrav);
    }
    return this.gravite$;
  }

  trouverFrequence(id: number): Observable<FrequenceVm> {
    const urlGetFreq = this.url_gdu + 'frequence?id=' + id;
    if (id != null) {
      this.frequence$ = this.http.get<FrequenceVm>(urlGetFreq);
    }
    return this.frequence$;
  }

  creerPas(newPas: PasVm) {
    const urlPostPas = this.url_gdu + 'pasc';

    this.http.post(urlPostPas, newPas).
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
  modifierPas(newPas: PasVm) {
    const urlPostPas = this.url_gdu + 'pascm';

    this.http.post(urlPostPas, newPas).
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
          });
    }
    return '';
  }


  modifDuer(id: number, gravite_Ex, frequence_Ex, prevEx, graviteMo, frequenceMo, prevMo): string {

    const urlPostDuerM = this.url_gdu + 'duerm?id=' + id + '&grEx=' + gravite_Ex +
      '&frEx=' + frequence_Ex + '&prev=' + prevEx + '&grMo=' + graviteMo +
      '&frMo=' + frequenceMo + '&prevMo=' + prevMo;

    this.http.post(urlPostDuerM, {}).
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

  detruireEvrp(id: number): string {

    const urlGetDEvrp = this.url_gdu + 'duerd?id=' + id;
    console.log(urlGetDEvrp);
    if (id != null) {
      this.http.post(urlGetDEvrp, {}).subscribe(
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
  }

  detruirePas( id: number, iduer: number): string {

    const urlGetDetPas = this.url_gdu + 'pasdet?id=' + id + '&iduer=' + iduer;

    console.log(urlGetDetPas);
    if ((id != null) && (iduer != null)) {
      this.http.post(urlGetDetPas, {}).subscribe(
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
  }

}

