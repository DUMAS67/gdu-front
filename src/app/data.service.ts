import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { RisquesVm } from './domains/RisquesVm';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DangersVm } from './domains/DangersVm';
import { UtVm } from './domains/UtVm';
import { LieuVm } from './domains/LieuVm';
import { CriticiteVm } from './domains/CriticiteVm';
import { GraviteVm } from './domains/Gravite';
import { FrequenceVm } from './domains/FrequenceVm';
import { ActivitesVm } from './domains/ActivitesVm';
import { CreationVm } from './domains/CreationVm';
import { DuerVM } from './domains/DuerVM';
import { PasVm } from './domains/PasVm';
import { Duer } from './domains/Duer';
import { Duer1 } from './domains/Duer1';
import { DuerFront } from './domains/DuerFront';
import { tap } from 'rxjs/operators';
import { Ut } from './domains/Ut';
import { PasFront } from './domains/PasFront';
import { FnParam } from '@angular/compiler/src/output/output_ast';
import { environment } from 'src/environments/environment';

/* Composant des services d'accès à la base deonnées gdu-db */

@Injectable({
  providedIn: 'root'
})



export class DataService {

  url_gdu = environment.baseUrl; // pour un serveur,le chemin réel est : http:/192... ou http:// DESKTOPN5-EX3
  listeR: Observable<RisquesVm[]>;
  listeD: Observable<DangersVm[]>;
  listeUts: Observable<UtVm[]>;
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

  listePas: Observable<PasFront[]>;
  listeCriticiteMo: Observable<number[]>;
  listePasFrontParDanger: Observable<PasFront[]>;
  listeDanger: Observable<DangersVm[]>;
  listeRisque: Observable<RisquesVm[]>;
  listeQui: Observable<string[]>;
  listePasFrontParRisque: Observable<PasFront[]>;
  listePasFrontParQui: Observable<PasFront[]>;

  subjectActUt = new Subject<UtVm[]>(); // Déclaration du Subject typé valeurs à traiter
  subjectActLieu = new Subject<LieuVm[]>(); // Déclaration du Subject typé valeurs à traiter
  subjectActDanger = new Subject<DangersVm[]>(); // Déclaration du Subject typé valeurs à traiter
  subjectActActivite = new Subject<ActivitesVm[]>(); // Déclaration du Subject typé valeurs à traiter
  subjectActDuerFront = new Subject<DuerFront[]>();
  subjectActPas = new Subject<PasVm[]>();
  listeDuerFrontParPareto: Observable<DuerFront[]>;
  date3: string;
  dateR: string;
  dateString: string;
  crea: CreationVm;

  constructor(private http: HttpClient) {



  }

  listeDuerFrontParCrititiciteMo: Observable<DuerFront[]>;



// Crée la liste de tous les risques
  afficherListeRisque(): Observable<RisquesVm[]> {
    this.listeR = this.http.get<RisquesVm[]>(this.url_gdu + 'risques');

    return this.listeR;

  }
// Crée la liste de tous les dangers
  afficherListeDanger(): Observable<DangersVm[]> {

    this.http.get<DangersVm[]>(this.url_gdu + 'dangers')
      .subscribe(
        list3 => {
          this.subjectActDanger.next(list3); // implémente la liste de la base dans le subject -> subject est réinitialisé
          this.listeD = of(list3); // transforme un objet en observable
        });
    return this.listeD;

  }
// Crée la liste de tous les Unités de lieu
  afficherListeUt(): Observable<UtVm[]> {
    this.http.get<UtVm[]>(this.url_gdu + 'uts').subscribe(
      list => {
        this.subjectActUt.next(list); // implémente la liste de la base dans le subject -> subject est réinitialisé
        this.listeUts = of(list); // transforme un objet en observable
      });

    return this.listeUts;
  }
// Crée la liste de tous les lieus
  afficherListeLieu(): Observable<LieuVm[]> {
    this.http.get<LieuVm[]>(this.url_gdu + 'lieus').subscribe(
      list1 => {
        this.subjectActLieu.next(list1); // implémente la liste de la base dans le subject -> subject est réinitialisé
        this.listeLieu = of(list1); // transforme un objet en observable
      });
    return this.listeLieu;
  }
// Crée la liste de toutes les activites
  afficherListeActivite(): Observable<ActivitesVm[]> {
    this.http.get<ActivitesVm[]>(this.url_gdu + 'activites').subscribe(
      list4 => {
        this.subjectActActivite.next(list4); // implémente la liste de la base dans le subject -> subject est réinitialisé
        this.listeActivite = of(list4); // transforme un objet en observable
      });
    return this.listeActivite;

  }
  // Crée la liste de tous les Ut existante dans le Duer
  afficherListeUtduDuer(): Observable<UtVm[]> {
    this.listeUt = this.http.get<UtVm[]>(this.url_gdu + 'duerlut');

    return this.listeUt;

  }
// Crée la liste de tous les lieus compris dans le Duer
  afficherListeLieuDansDuer(): Observable<LieuVm[]> {
    this.listeLieu = this.http.get<LieuVm[]>(this.url_gdu + 'duerllieu');

    return this.listeLieu;

  }
// Crée la liste de toutes les gravités
  afficherListeGravite(): Observable<GraviteVm[]> {
    this.listeGravite = this.http.get<GraviteVm[]>(this.url_gdu + 'gravites');

    return this.listeGravite;

  }

  // Crée la liste de toutes les fréquences
  afficherListeFrequence(): Observable<FrequenceVm[]> {
    this.listeFrequence = this.http.get<FrequenceVm[]>(this.url_gdu + 'frequences');
    return this.listeFrequence;

  }


// Crée la liste de toutes les Evrp en format lisible pour l'utilisateur
  afficherListeDuerFront(): Observable<DuerFront[]> {
    this.http.get<DuerFront[]>(this.url_gdu + 'duerf').subscribe(
      list5 => {
        this.subjectActDuerFront.next(list5); // implémente la liste de la base dans le subject -> subject est réinitialisé
        this.listeDuerFront = of(list5); // transforme un objet en observable
      });

    return this.listeDuerFront;
  }

  // Crée la liste de toutes les Evrp filtrée par un Pareto
  afficherListeDuerPareto(): Observable<DuerFront[]> {

    this.listeDuerFrontParPareto = this.http.get<DuerFront[]>(this.url_gdu + 'duerf');
    return this.listeDuerFrontParPareto;
  }
// Crée la liste des Evrp sélectionnée par la criticité de la prévention existante

  afficherListeDuerFrontParCriticite(crit: number): Observable<DuerFront[]> {
    this.listeDuerFrontParCrititicite = this.http.get<DuerFront[]>(this.url_gdu + 'duercc?crit=' + crit);
    return this.listeDuerFrontParCrititicite;
  }
  // Crée la liste des Evrp sélectionnée par la criticité de la prévention à mettre en oeuvre
  afficherListeDuerFrontParCriticiteMo(crit: number): Observable<DuerFront[]> {
    this.listeDuerFrontParCrititiciteMo = this.http.get<DuerFront[]>(this.url_gdu + 'duercmo?crit=' + crit);
    return this.listeDuerFrontParCrititiciteMo;
  }

// Crée la liste des Evrp sélectionnée par l'Unité de travail
// ut = indice de liste des UT
  afficherListeDuerFrontParUt(ut: number): Observable<DuerFront[]> {
    this.listeDuerFrontParUt = this.http.get<DuerFront[]>(this.url_gdu + 'duerut?ut=' + ut);
    return this.listeDuerFrontParUt;
  }
// Crée la liste des Evrp sélectionnée par le lieu
// indice de liste des Lieu
  afficherListeDuerFrontParLieu(lieu: number): Observable<DuerFront[]> {
    this.listeDuerFrontParLieu = this.http.get<DuerFront[]>(this.url_gdu + 'duerlieu?lieu=' + lieu);
    return this.listeDuerFrontParLieu;
  }

  /* Crée la liste des criticité dans les préventions existantes*/
  afficherListeCriticite(): Observable<number[]> {
    this.listeCriticite = this.http.get<number[]>(this.url_gdu + 'duerc');

    return this.listeCriticite;
  }

  /* Crée la liste des Pas avec clef du Duer*/
  afficherListePas(): Observable<PasFront[]> {

    this.http.get<PasFront[]>(this.url_gdu + 'passf').subscribe(
      list6 => {
        this.subjectActPas.next(list6); // implémente la liste de la base dans le subject -> subject est réinitialisé
        this.listePas = of(list6); // transforme un objet en observable
      });
    return this.listePas;
  }

  /* Crée la liste des Dangers contenu dans le pas* = plan d'action spécifique */
  afficherListeDangerduPas(): Observable<DangersVm[]> {
    this.listeDanger = this.http.get<DangersVm[]>(this.url_gdu + 'pasldg');

    return this.listeDanger;

  }
  /* Crée la liste des Risques contenu dans le pas*/
  afficherListeRisqueduPas(): Observable<RisquesVm[]> {
    this.listeRisque = this.http.get<RisquesVm[]>(this.url_gdu + 'paslrq');

    return this.listeRisque;

  }

  /* crée la liste des Qui contenu dans le pas*/
  afficherListeQuiduPas(): Observable<string[]> {
    this.listeQui = this.http.get<string[]>(this.url_gdu + 'paslqui');

    return this.listeQui;

  }

  /* Crée la liste des pas par Danger */
  // danger = valeur de l'indice dans la table de Danger
  afficherListePasFrontParDanger(danger: number): Observable<PasFront[]> {
    this.listePasFrontParDanger = this.http.get<PasFront[]>(this.url_gdu + 'passfdg?id=' + danger);
    return this.listePasFrontParDanger;
  }

  /* Crée la liste des pas par Risque */
   // rq = valeur de l'indice dans la table des Risques
  afficherListePasFrontParRisque(rq: number): Observable<PasFront[]> {
    this.listePasFrontParRisque = this.http.get<PasFront[]>(this.url_gdu + 'passfrq?id=' + rq);
    return this.listePasFrontParRisque;
  }

  /*  Crée la liste des pas par Qui?*/
  afficherListePasFrontParQui(qui: string): Observable<PasFront[]> {
    this.listePasFrontParQui = this.http.get<PasFront[]>(this.url_gdu + 'passfqui?nom=' + qui);
    return this.listePasFrontParQui;
  }

  /* Crée la liste des criticité dans les préventions à Maître en Oeuvre*/
  afficherListeCriticiteMo(): Observable<number[]> {
    this.listeCriticiteMo = this.http.get<number[]>(this.url_gdu + 'duercmos');

    return this.listeCriticiteMo;

  }

  /*  Crée la liste des créations du Duer */
  afficherListeCrea(): Observable<CreationVm[]> {
    return this.http.get<CreationVm[]>(this.url_gdu + 'creas');
  }

  // Crée une Unité de Travail
  creerUt(newUt: string): string {
    const urlPostUt = this.url_gdu + 'ut?nom=' + newUt;

    this.http.post(urlPostUt, {}, { responseType: 'text' }).
      // toujours post(adresse, {body}, {type de réponse})

      subscribe(
        (data: string) => {
          this.afficherListeUt(); // rafraichi la liste après création de l'UT
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);

          return error;
        });
    return '';

  }
// Modifie une Unité de Travail
// idav = indice de la table UT
// nomap = nouveau nom d'UT
  modifUt(idav: number, nomap: string): string {

    const urlPostUt = this.url_gdu + 'utm?id=' + idav + '&nomap=' + nomap;

    this.http.post(urlPostUt, {}, { responseType: 'text' }).
      subscribe(
        (data: any) => {

          this.afficherListeUt(); // rafraichi la liste après création de l'UT
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }
// Crée un Lieu
  creerLieu(newLieu: string): string {
    const urlPostLieu = this.url_gdu + 'lieu?nom=' + newLieu;
    this.http.post(urlPostLieu, {}, { responseType: 'text' }).
      subscribe(
        (data: string) => {
          this.afficherListeLieu();
          return data;
        },
        (error: string) => {
          console.log('error', error);
          return error;
        });
    return '';
  }
// Modifie un Lieu
// idav = indice de la table Lieu
// nomap = nouveau nom de Lieu
  modifLieu(idav: number, nomap: string): string {

    const urlPostLieu = this.url_gdu + 'lieum?id=' + idav + '&nomap=' + nomap;

    this.http.post(urlPostLieu, {}, { responseType: 'text' }).
      subscribe(
        (data: any) => {
          this.afficherListeLieu();
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }
// Crée une Activité
  creerActivite(newActivite: string): string {
    const urlPostActivite = this.url_gdu + 'activite?nom=' + newActivite;


    this.http.post(urlPostActivite, {}, { responseType: 'text' }).
      subscribe(
        (data: any) => {

          this.afficherListeActivite();
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }
// Modifie une Activité
// idav = indice de la table Activité
// nomap = nouveau nom d'Activité
  modifActivite(idav: number, nomap: string): string {

    const urlPostActivite = this.url_gdu + 'activitem?id=' + idav + '&nomap=' + nomap;

    this.http.post(urlPostActivite, {}, { responseType: 'text' }).
      subscribe(
        (data: any) => {

          this.afficherListeActivite();
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }

// Crée un Danger
  creerDanger(nouveauNomDanger: string): string {
    const urlPostDg = this.url_gdu + 'danger?nom=' + nouveauNomDanger;


    this.http.post(urlPostDg, {}, { responseType: 'text' }).
      subscribe(
        (data: any) => {

          this.afficherListeDanger();
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }
// Modifie un Danger
// idav = indice de la table Danger
// nomap = nouveau nom de Danger

  modifDanger(idav: number, nomap: string): string {

    const urlPostDg = this.url_gdu + 'dangerm?id=' + idav + '&nomap=' + nomap;

    this.http.post(urlPostDg, {}, { responseType: 'text' }).
      subscribe(
        (data: any) => {

          this.afficherListeDanger();
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }

// Trouve une Unité de Travail par identifiant
// id = indice de la table UT
  trouverUt(id: number): Observable<UtVm> {
    const urlGetUt = this.url_gdu + 'ut?id=' + id;

    if (id != null) {
      this.ut$ = this.http.get<UtVm>(urlGetUt);
      return this.ut$;
    }

  }
// Trouve un Lieu par un identifiant
// id = indice de la table Lieu
  trouverLieu(id: number): Observable<LieuVm> {
    const urlGetLieu = this.url_gdu + 'lieu?id=' + id;
    if (id != null) {
      this.lieu$ = this.http.get<LieuVm>(urlGetLieu);

      return this.lieu$;
    }
  }
// Trouve une activité par un identifiant
// id = indice de la table Activité
  trouverActivite(id: number): Observable<ActivitesVm> {
    const urlGetAct = this.url_gdu + 'activite?id=' + id;
    if (id != null) {
      this.activite$ = this.http.get<ActivitesVm>(urlGetAct);
      return this.activite$;
    }

  }
// Trouve un Danger par un identifiant
// id = indice de la table Danger
  trouverDanger(id: number): Observable<DangersVm> {
    const urlGetDg = this.url_gdu + 'danger?id=' + id;
    if (id != null) {
      this.danger$ = this.http.get<DangersVm>(urlGetDg);
    }
    return this.danger$;
  }
// Trouve un Risque par identifiant
// id = indice de la table Risque
  trouverRisque(id: number): Observable<RisquesVm> {
    const urlGetRis = this.url_gdu + 'risque?id=' + id;
    if (id != null) {
      this.risque$ = this.http.get<RisquesVm>(urlGetRis);
    }
    return this.risque$;
  }

  // Trouver gravité par identifiant
  // id = indice de la table Gravité
  trouverGravite(id: number): Observable<GraviteVm> {
    const urlGetGrav = this.url_gdu + 'gravite?id=' + id;
    if (id != null) {
      this.gravite$ = this.http.get<GraviteVm>(urlGetGrav);
    }
    return this.gravite$;
  }

  // Trouver fréquence par id
  // id = indice de la table Frequence
  trouverFrequence(id: number): Observable<FrequenceVm> {
    const urlGetFreq = this.url_gdu + 'frequence?id=' + id;
    if (id != null) {
      this.frequence$ = this.http.get<FrequenceVm>(urlGetFreq);
    }
    return this.frequence$;
  }

  // Crée un Plan d'Action Spécifique
  creerPas(newPas: PasVm) {
    const urlPostPas = this.url_gdu + 'pasc';

    this.http.post(urlPostPas, newPas, { responseType: 'text' }).
      subscribe(
        (data: any) => {

          this.afficherListeDuerFront();
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }

  // Modifie un Plan d'Action Spécifique
  // newPas = objet P.A.S à modifier
  modifierPas(newPas: PasVm) {
    const urlPostPas = this.url_gdu + 'pascm';

    this.http.post(urlPostPas, newPas, { responseType: 'text' }).
      subscribe(
        (data: any) => {
          this.afficherListePas();
          this.afficherListeDuerFront();
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }

// Trouve un Plan d'Action Spécifique par identifiant
// id = indice de la table PlanActionSpecifique
  trouverPas(id: number): Observable<PasVm> {
    const urlGetPas = this.url_gdu + 'pas?id=' + id;
    if (id != null) {
      this.pas$ = this.http.get<PasVm>(urlGetPas);
    }
    return this.pas$;
  }

  // Crée un Evrp pour Duer  format par objet
  creerDuer(duerCrea: Duer): string {
    const urlPostDuer = this.url_gdu + 'duer';


    this.http.post(urlPostDuer, duerCrea, { responseType: 'text' }).
      subscribe(
        (data: any) => {

          this.afficherListeDuerFront();
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }

  // Crée un Evrp pour Duer format par identifiant
  creerDuer1(duerCrea: Duer1): string {
    const urlPostDuer = this.url_gdu + 'duer';

    if (duerCrea != null) {
      this.http.post(urlPostDuer, duerCrea, { responseType: 'text' }).
        subscribe(
          (data: any) => {

            this.afficherListeDuerFront();
            return data;
          },
          (error: HttpErrorResponse) => {
            console.log('error', error);
            return error;
          });
    }
    return '';
  }

// Modifie une ligne d'Evrp
// id = numéro d'id du Duer à modifier
  // gravite_Ex = valeur de gravité à modifier dans l'Evrp pour la prévention existante
  // frequence_Ex = valeur de fréquence à modifier dans l'Evrp pour la prévention existante
  // prev_Ex = nouvelle prévention existantepour l'EVrp
  // graviteMo = valeur de gravité à modifer dans l'Evrp pour la prévention à mettre en oeuvre
  // frequenceMo = valeur de fréquence à modifier dans l'Evrp pour la prévention à mettre en oeuvre
   // prevMo = nouvelle prévention à mettre en oeuvre pour l'EVrp

  modifDuer(id: number, gravite_Ex, frequence_Ex, prevEx, graviteMo, frequenceMo, prevMo): string {

    const urlPostDuerM = this.url_gdu + 'duerm?id=' + id + '&grEx=' + gravite_Ex +
      '&frEx=' + frequence_Ex + '&prev=' + prevEx + '&grMo=' + graviteMo +
      '&frMo=' + frequenceMo + '&prevMo=' + prevMo;

    this.http.post(urlPostDuerM, {}, { responseType: 'text' }).
      subscribe(
        (data: any) => {

          this.afficherListeDuerFront();
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }
// Modifie une ligne du plan de Prévention
  modifDuerPrev(id: number, graviteMo, frequenceMo, prevMo): string {

    const urlPostDuerM = this.url_gdu + 'duermp?id=' + id + '&grMo=' + graviteMo +
      '&frMo=' + frequenceMo + '&prevMo=' + prevMo;

    this.http.post(urlPostDuerM, {}, { responseType: 'text' }).
      subscribe(
        (data: any) => {

          this.afficherListeDuerFront();
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }

// Détruit une ligne d'Evrp
// id = numéro d'identification de l'Evrp dans le DUER
// idPas = numéro d'identification du Plan d'Acrion Spécifique pour l' id de l'Evrp dans le DUER
  detruireEvrp(id: number, idPas: number): string {

    const urlGetDEvrp = this.url_gdu + 'duerd?id=' + id + '&idpas=' + idPas;

    if (id != null) {
      this.http.post(urlGetDEvrp, {}, { responseType: 'text' }).
        subscribe(
          (data: any) => {

            this.afficherListeDuerFront();
            return data;
          },
          (error: HttpErrorResponse) => {
            console.log('error', error);
            return error;
          });
      return '';
    }
  }

  // Détruit une ligne de Plan d'Action Spécifique
  // id = identifiant du P.A.S à détruire
  // iduer = identifiant du Duer contenant le P.A.S
  detruirePas(id: number, iduer: number): string {

    const urlGetDetPas = this.url_gdu + 'pasdet?id=' + id + '&iduer=' + iduer;


    if ((id != null) && (iduer != null)) {
      this.http.post(urlGetDetPas, {}, { responseType: 'text' }).
        subscribe(
          (data: any) => {

            this.afficherListePas();
            this.afficherListeDuerFront();
            return data;
          },
          (error: HttpErrorResponse) => {
            console.log('error', error);
            return error;
          });
      return '';
    }
  }


// Modif de la date d'avant dernière modification du Duer
// date2 = date d'avant dernière enregistrement
  modifDateDuer2(date2: string): string {

    const urlGetModifDateDuer2 = this.url_gdu + 'creatp?id=2&date=' + date2;

    this.http.post(urlGetModifDateDuer2, {}, { responseType: 'text' }).
      subscribe(
        (data: any) => {
         ;
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }

  // Modif de la dernière date de connexion au Duer
  // date3 = date dernièr enregistrement
  modifDateDuer3(date3: string): string {

    const urlGetModifDateDuer3 = this.url_gdu + 'creatp?id=3&date=' + date3;

    this.http.post(urlGetModifDateDuer3, {}, { responseType: 'text' }).
      subscribe(
        (data: any) => {

          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';

  }
// Donne la dernière date de modification du Duer enregistrée
  trouverDateAnterieure(): Observable<CreationVm> {
    const urlGetTrouveDateDuer = this.url_gdu + 'creat?id=3';
    return this.http.get<CreationVm>(urlGetTrouveDateDuer);
   }

   // Modifie l'ensemble des dates du Duer sauf Date de Création
   // date3 = date d'enregistrement à la déconnexion
  modifDateDuer1(date3: string) {
   this.trouverDateAnterieure()
    .subscribe((a: CreationVm) => {
    this.dateR = a.date;

    this.modifDateDuer2(this.dateR);
    this.modifDateDuer3(date3);
    });


  }


}

