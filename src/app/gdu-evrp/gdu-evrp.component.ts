import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Collaborateur } from '../auth.domains';
import { CookieService } from 'ngx-cookie-service';
import { RisquesVm } from '../domains/RisquesVm';
import { DataService } from '../data.service';
import { FrequenceVm } from '../domains/FrequenceVm';
import { GraviteVm } from '../domains/Gravite';
import { CriticiteVm } from '../domains/CriticiteVm';
import { UtVm } from '../domains/UtVm';
import { LieuVm } from '../domains/LieuVm';
import { ActivitesVm } from '../domains/ActivitesVm';
import { DangersVm } from '../domains/DangersVm';
import { Ut } from '../environments/Ut';
import { DuerVM } from '../domains/DuerVM';
import { PasVm } from '../domains/PasVm';
import { Duer } from '../domains/Duer';
import { async } from 'rxjs/internal/scheduler/async';
import { AsyncPipe } from '@angular/common';
import { Duer1 } from '../domains/Duer1';
import { Observable } from 'rxjs';
import { FnParam } from '@angular/compiler/src/output/output_ast';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-gdu-evrp',
  templateUrl: './gdu-evrp.component.html',
  styleUrls: []
})
export class GduEvrpComponent implements OnInit {

  collaborateurConnecte: Collaborateur;
  newDuer1: Duer1;
  crit1: number;
  crit1o: number;
  nomActivite: string;
  nomDanger: string;
  valeurCriticite: number;
  valeurFrequence: number;
  valeurGravite: number;
  nomRisque: string;
  a: string;


  constructor(private dataService: DataService, private _router: Router,
              private _cookieService: CookieService, private route: ActivatedRoute) { }
  recupId: number;
  recupNom: string;
  nomUt: string;
  nomLieu: string;
  headElementsUt = ['UT', 'Sélection'];
  headElementsLieu = ['Lieu', 'Sélection'];
  headElementsDg = ['Danger', 'Sélection'];
  headElementsAct = ['Activité', 'Sélection'];

  // listeLieu$ = this.dataService.afficherListeLieu();
  listeLieu: LieuVm[];
  listeCriticite$ = this.dataService.afficherListeCriticite();
  listeCriticite: CriticiteVm[];

  // listeUt$ = this.dataService.afficherListeUt();
  listeUt: UtVm[];

  listeGravite$ = this.dataService.afficherListeGravite();
  listeGravite: GraviteVm[];
  listeFrequence$ = this.dataService.afficherListeFrequence();
  listeFrequence: FrequenceVm[];
  // listeActivite$ = this.dataService.afficherListeActivite();
  listeActivite: ActivitesVm[];
 // listeDanger$ = this.dataService.afficherListeDanger();
  listeDanger: DangersVm[];
  listeRisque$ = this.dataService.afficherListeRisque();
  listeRisque: RisquesVm[];
  text: string;
  textAct: string;
  textDg: string;
  textLieu: string;
  textUt: string;
  recupNomAModifier: string;
  modifNomUt: string;
  modifNomLieu: string;
  modifNomActivite: string;
  modifNomDanger: string;
  creerPrev1ex: string;
  creerPrev1Mo: string;
  creerPrev2ex: string;
  creerPrev2Mo: string;
  creaEvrp1: Duer1 = new Duer1(null, null, null, null, null, null, null, null, null, null, null);
  creaEvrp2: Duer1 = new Duer1(null, null, null, null, null, null, null, null, null, null, null);
  criticite: number;
  valeur: number;
  ut1: UtVm;
  lieu1: LieuVm;
  activite1: ActivitesVm;
  danger1: DangersVm;
  risque1: RisquesVm;
  gr1: GraviteVm;
  gr1o: GraviteVm;
  fr1: FrequenceVm;
  fr1o: FrequenceVm;
  cr1: CriticiteVm;
  cr1o: CriticiteVm;
  pas1: PasVm;
  prev1: string;
  prev1o: string;
  duerB1: Duer;
  creaEvrp1Ok = false;
  creaEvrp2Ok = false;
  finValid = false;
  messageValid = '';
  confirmeDonneesRisque1 = false;
  confirmeDonneesRisque2 = false;

  ngOnInit() {



    this.listeGravite$.subscribe((param: GraviteVm[]) => {
      this.listeGravite = param.sort((a, b) => (a.valeur - b.valeur));
    }
    );


    this.listeRisque$.subscribe((param: RisquesVm[]) => {
      this.listeRisque = param.sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0)));
    }
    );
    this.listeFrequence$.subscribe((param: FrequenceVm[]) => {
      this.listeFrequence = param.sort((a, b) => (a.valeur - b.valeur));
    }
    );

    // Abonnement Ut

    console.log('Trace Avant Subject');
    // !la listeUt reçoit les dernières données du Subject
    // Connexion de listeUt sur subject par souscription
    this.dataService.subjectActUt.subscribe((param: UtVm[]) => {
      console.log('Trace Déclenchement de l\' observateur');
      this.listeUt = param.sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0)));

    }
    );


    // Abonnement Lieu
    console.log('Trace Avant Subject');
    // !la listeLieu reçoit les dernières données du Subject
    // Connexion de listeLieu sur subject par souscription
    this.dataService.subjectActLieu.subscribe((param: LieuVm[]) => {
      console.log('Trace Déclenchement de l\' observateur');
      this.listeLieu = param.sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0)));

    }
    );

// Abonnement Activite
    console.log('Trace Avant Subject');
// !la liste Danger reçoit les dernières données du Subject
// Connexion de listeLieu sur subject par souscription
    this.dataService.subjectActActivite.subscribe((param: ActivitesVm[]) => {
  console.log('Trace Déclenchement de l\' observateur Activite');
  this.listeActivite = param.sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0)));

}
);

    // Abonnement Danger
    console.log('Trace Avant Subject');
    // !la liste Danger reçoit les dernières données du Subject
    // Connexion de listeLieu sur subject par souscription
    this.dataService.subjectActDanger.subscribe((param: DangersVm[]) => {
      console.log('Trace Déclenchement de l\' observateur Danger');
      this.listeDanger = param.sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0)));

    }
    );

    this.dataService.afficherListeUt(); // Initialise le subject à la liste Ut de la Base
    console.log('Trace afficherListeUt dans NgOnit');

    this.dataService.afficherListeLieu(); // Initialise le subject à la liste Lieu de la Base
    console.log('Trace afficherListeLieu dans NgOnit');

    this.dataService.afficherListeActivite(); // Initialise le subject à la liste Lieu de la Base
    console.log('Trace afficherListe Activite dans NgOnit');

    this.dataService.afficherListeDanger(); // Initialise le subject à la liste Lieu de la Base
    console.log('Trace afficherListe Danger dans NgOnit');



  }// Fin NgOnInit

  rafraichirListeUt() {
    this.dataService.afficherListeUt();

    // window.location.reload();
  }

  recupItem(utId: number, utValeur: string) {

    this.recupNom = utValeur;
    this.recupId = utId;
    this.recupNomAModifier = utValeur;
    console.log(this.recupId);
    console.log(this.recupNom);
    return this.recupNom;
  }

  afficherModif(): boolean {
    this.collaborateurConnecte = JSON.parse(this._cookieService.get('col'));
    return (this.collaborateurConnecte.roles[0] === this.collaborateurConnecte.ADMIN);
  }

  creerUt1(nouveauNomUt: string) {
    this.dataService.creerUt(nouveauNomUt);
  }

  modifUt1(idav: number, nomap: string) {
    this.dataService.modifUt(idav, nomap);
  }

  creerLieu1(nouveauNomLieu: string) {
    this.dataService.creerLieu(nouveauNomLieu);
  }

  modifLieu1(idav: number, nomap: string) {
    this.dataService.modifLieu(idav, nomap);
  }
  creerActivite1(nouveauNomActivite: string) {
    console.log(nouveauNomActivite);
    this.dataService.creerActivite(nouveauNomActivite);
  }

  modifActivite1(idav: number, nomap: string) {
    this.dataService.modifActivite(idav, nomap);
  }

  creerDanger1(nouveauNomActivite: string) {

    this.dataService.creerDanger(nouveauNomActivite);
  }

  modifDanger1(idav: number, nomap: string) {
    this.dataService.modifDanger(idav, nomap);
  }
  trouverUt1(id: number): Observable<UtVm> {

    return this.dataService.trouverUt(id);

  }

  trouverLieu1(id: number): string {

    this.dataService.trouverLieu(id).subscribe(
      (param: LieuVm) => {
        this.nomLieu = param.nom;
      }
    );
    return this.nomLieu;
  }
  trouverActivite1(id: number): string {

    this.dataService.trouverActivite(id).subscribe(
      (param: ActivitesVm) => {
        this.nomActivite = param.nom;
      }
    );
    return this.nomLieu;
  }
  trouverDanger1(id: number): string {

    this.dataService.trouverDanger(id).subscribe(
      (param: DangersVm) => {
        this.nomDanger = param.nom;
      }
    );
    return this.nomDanger;
  }
  trouverRisque1(id: number): string {

    this.dataService.trouverRisque(id).subscribe(
      (param: RisquesVm) => {
        this.nomRisque = param.nom;
      }
    );
    return this.nomRisque;
  }


  trouverFrequence1(id: number): number {

    this.dataService.trouverFrequence(id).subscribe(
      (param: FrequenceVm) => {
        this.valeurFrequence = param.valeur;
      }
    );
    return this.valeurFrequence;
  }
  trouverGravite1(id: number): number {

    this.dataService.trouverGravite(id).subscribe(
      (param: GraviteVm) => {
        this.valeurGravite = param.valeur;
      }
    );
    return this.valeurGravite;
  }


  creerDuer11(
    utNom: number,
    lieuNom: number, activiteNom: number, dangerNom: number,
    risquesNom: number, gr1Nom: number, frq1Nom: number,
    prev1Ex: string, gros1Nom: number, frq1osNom: number,
    prev1Mo: string) {
    if ((utNom !== null) && (lieuNom !== null) && (activiteNom !== null) &&
      (dangerNom !== null) && (risquesNom !== null) && (gr1Nom !== null) &&
      (frq1Nom !== null) && (prev1Ex !== null) && (gros1Nom !== null) && (frq1osNom !== null) &&
      (prev1Mo !== null)) {
      this.creaEvrp1Ok = true;
      this.creaEvrp1.id_ut = utNom;
      this.creaEvrp1.id_lieu = lieuNom;
      this.creaEvrp1.id_activite = activiteNom;
      this.creaEvrp1.id_danger = dangerNom;
      this.creaEvrp1.id_risque = risquesNom;
      this.creaEvrp1.id_gravEx = gr1Nom;
      this.creaEvrp1.id_FreqEx = frq1Nom;
      this.creaEvrp1.prevEx = prev1Ex;
      this.creaEvrp1.id_gravMo = gros1Nom;
      this.creaEvrp1.id_FreqMo = frq1osNom;
      this.creaEvrp1.prevMo = prev1Mo;
      this.messageValid = 'Validé';
      this.confirmeDonneesRisque1 = false;
      this.confirmeDonneesRisque2 = false;
    } else {
      this.creaEvrp1Ok = false;
      this.confirmeDonneesRisque1 = false;
      this.messageValid = 'Erreur dans les données';
    }

    if (this.creaEvrp1Ok) {
      this.dataService.creerDuer1(this.creaEvrp1);
    }
    console.log(JSON.stringify(this.creaEvrp1));


    console.log('***************Risque1***************');
    console.log('UT : ' + this.creaEvrp1.id_ut);
    console.log('Lieu : ' + this.creaEvrp1.id_lieu);
    console.log('Activite :' + this.creaEvrp1.id_activite);
    console.log('Danger :' + this.creaEvrp1.id_danger);
    console.log('Risque 1 :' + this.creaEvrp1.id_risque);
    console.log('Gravité 1 Existante : ' + this.creaEvrp1.id_gravEx);
    console.log('Fréquence 1 Existante : ' + this.creaEvrp1.id_FreqEx);
    console.log('Prévention 1 Existante : ' + this.creaEvrp1.prevEx);
    console.log('Gravité 1 MO : ' + this.creaEvrp1.id_gravMo);
    console.log('Fréquence 1 MO : ' + this.creaEvrp1.id_FreqMo);
    console.log('Prévention 1 MO: ' + this.creaEvrp1.prevMo);
    console.log(this.messageValid);
  }
  creerDuer12(
    utNom: number,
    lieuNom: number, activiteNom: number, dangerNom: number,
    risquesNom: number, gr1Nom: number, frq1Nom: number,
    prev1Ex: string, gros1Nom: number, frq1osNom: number,
    prev1Mo: string) {
    if ((utNom !== null) && (lieuNom !== null) && (activiteNom !== null) &&
      (dangerNom !== null) && (risquesNom !== null) && (gr1Nom !== null) &&
      (frq1Nom !== null) && (prev1Ex !== null) && (gros1Nom !== null) && (frq1osNom !== null) &&
      (prev1Mo !== null)) {
      this.creaEvrp2Ok = true;
      this.creaEvrp2.id_ut = utNom;
      this.creaEvrp2.id_lieu = lieuNom;
      this.creaEvrp2.id_activite = activiteNom;
      this.creaEvrp2.id_danger = dangerNom;
      this.creaEvrp2.id_risque = risquesNom;
      this.creaEvrp2.id_gravEx = gr1Nom;
      this.creaEvrp2.id_FreqEx = frq1Nom;
      this.creaEvrp2.prevEx = prev1Ex;
      this.creaEvrp2.id_gravMo = gros1Nom;
      this.creaEvrp2.id_FreqMo = frq1osNom;
      this.creaEvrp2.prevMo = prev1Mo;
      this.messageValid = 'Validé';
      this.confirmeDonneesRisque2 = false;
    } else {
      this.creaEvrp2Ok = false;
      this.confirmeDonneesRisque2 = false;
      this.messageValid = 'Erreur dans les données';
    }

    if (this.creaEvrp2Ok) {
      this.dataService.creerDuer1(this.creaEvrp2);
    }
    console.log(JSON.stringify(this.creaEvrp2));


  }

  confirmerDonneesRisque1() { this.confirmeDonneesRisque1 = true; }
  confirmerDonneesRisque2() { this.confirmeDonneesRisque2 = true; }
  reinitialiser() { this.creaEvrp1Ok = false; }

  creerDuer1(
    utsNom: number,
    lieusNom: number, activitesNom: number, dangersNom: number,
    risques1Nom: number, gr1sNom: number, frq1sNom: number,
    prev1Ex: string, gros1Nom: number, frq1osNom: number,
    prev1Mo: string, rsq2sNom: number, gr2sNom: number, frq2sNom: number,
    prev2Ex: string, gr2osNom: number, frq2osNom: number,
    prev2Mo: string): string {
    if ((utsNom !== null) && (lieusNom !== null) && (activitesNom !== null) &&
      (dangersNom !== null) && (risques1Nom !== null) && (gr1sNom !== null) &&
      (frq1sNom !== null) && (prev1Ex !== null) && (gros1Nom !== null) && (frq1osNom !== null) &&
      (prev1Mo !== null)) {
      this.creaEvrp1Ok = true;
      this.creaEvrp1.id_ut = utsNom;
      this.creaEvrp1.id_lieu = lieusNom;
      this.creaEvrp1.id_activite = activitesNom;
      this.creaEvrp1.id_danger = dangersNom;
      this.creaEvrp1.id_risque = risques1Nom;
      this.creaEvrp1.id_gravEx = gr1sNom;
      this.creaEvrp1.id_FreqEx = frq1sNom;
      this.creaEvrp1.prevEx = prev1Ex;
      this.creaEvrp1.id_gravMo = gros1Nom;
      this.creaEvrp1.id_FreqMo = frq1osNom;
      this.creaEvrp1.prevMo = prev1Mo;
    } else { this.creaEvrp1Ok = false; }
    if ((rsq2sNom !== null) && (gr2sNom !== null) && (frq2sNom !== null) &&
      (prev2Ex !== null) && (gr2osNom !== null) && (frq2osNom !== null) &&
      (prev2Mo !== null)) {
      this.creaEvrp2Ok = true;
      this.creaEvrp2.id_ut = utsNom;
      this.creaEvrp2.id_lieu = lieusNom;
      this.creaEvrp2.id_activite = activitesNom;
      this.creaEvrp2.id_danger = dangersNom;
      this.creaEvrp2.id_risque = rsq2sNom;
      this.creaEvrp2.id_gravEx = gr2sNom;
      this.creaEvrp2.id_FreqEx = frq2sNom;
      this.creaEvrp2.prevEx = prev2Ex;
      this.creaEvrp2.id_gravMo = gr2osNom;
      this.creaEvrp2.id_FreqMo = frq2osNom;
      this.creaEvrp2.prevMo = prev2Mo;
    } else { this.creaEvrp2Ok = false; }
    console.log('***************Risque1***************');
    console.log('UT : ' + this.creaEvrp1.id_ut);
    console.log('Lieu : ' + this.creaEvrp1.id_lieu);
    console.log('Activite :' + this.creaEvrp1.id_activite);
    console.log('Danger :' + this.creaEvrp1.id_danger);
    console.log('Risque 1 :' + this.creaEvrp1.id_risque);
    console.log('Gravité 1 Existante : ' + this.creaEvrp1.id_gravEx);
    console.log('Fréquence 1 Existante : ' + this.creaEvrp1.id_FreqEx);

    console.log('Prévention 1 Existante : ' + this.creaEvrp1.prevEx);
    console.log('Gravité 1 MO : ' + this.creaEvrp1.id_gravMo);
    console.log('Fréquence 1 MO : ' + this.creaEvrp1.id_FreqMo);

    console.log('Prévention 1 MO: ' + this.creaEvrp1.prevMo);
    console.log('***************Risque2**********************');
    console.log('UT : ' + this.creaEvrp2.id_ut);
    console.log('Lieu : ' + this.creaEvrp2.id_lieu);
    console.log('Activite :' + this.creaEvrp2.id_activite);
    console.log('Danger :' + this.creaEvrp2.id_danger);
    console.log('Risque 2 :' + this.creaEvrp2.id_risque);
    console.log('Gravité 2 Existante : ' + this.creaEvrp2.id_gravEx);
    console.log('Fréquence 2 Existante : ' + this.creaEvrp2.id_FreqEx);

    console.log('Prévention 2 Existante : ' + this.creaEvrp2.prevEx);
    console.log('Gravité 2 MO : ' + this.creaEvrp2.id_gravMo);
    console.log('Fréquence 2 MO : ' + this.creaEvrp2.id_FreqMo);

    console.log('Prévention 2 MO: ' + this.creaEvrp2.prevMo);

    console.log('AA' + this.creaEvrp1.id_ut);



    if ((this.creaEvrp1Ok) && (this.creaEvrp2Ok)) {

      this.dataService.creerDuer1(this.creaEvrp1);
      this.dataService.creerDuer1(this.creaEvrp2);
    }
    console.log(JSON.stringify(this.creaEvrp1));

    if (!this.creaEvrp1Ok) {
      return 'un des champs est mal ou pas renseigné pour le risque 1';
    }
    if (!this.creaEvrp2Ok) {
      return 'un des champs est mal ou pas renseigné pour le risque 2';
    }
  }
  fermerEvrp() {
    this._router.navigate(['/gdu']);
  }

  crit(valeur1: number, valeur2: number): number {

    console.log('Valeur de la Gravité  :' + this.listeGravite[valeur1 - 1].valeur);
    console.log('Valeur de la Fréquence  :' + this.listeFrequence[valeur2 - 1].valeur);
    this.criticite = this.listeGravite[valeur1 - 1].valeur * this.listeFrequence[valeur2 - 1].valeur;
    console.log('valeurx = ' + this.criticite);
    return this.criticite;
  }

  coherenceDonnee(utsNom: number): boolean {
    if (utsNom != null) { return true; } else { return false; }
  }
  rafPageEvrp() {
    this.finValid = true;
    this.confirmeDonneesRisque1 = false;
    this.confirmeDonneesRisque2 = false;
    this.creaEvrp1Ok = false;
    this.creaEvrp2Ok = false;
  }
}
/* this.ut1 = new UtVm(this.creaEvrp1.id_UT, this.trouverUt1(this.creaEvrp1.id_UT));
     console.log(this.ut1.nom);
     this.lieu1 = new LieuVm(this.creaEvrp1.id_lieu, this.trouverLieu1(this.creaEvrp1.id_lieu));
     this.activite1 = new ActivitesVm(this.creaEvrp1.id_activite, this.trouverActivite1(this.creaEvrp1.id_activite));
     this.danger1 = new DangersVm(this.creaEvrp1.id_danger, this.trouverDanger1(this.creaEvrp1.id_danger));
     this.risque1 = new RisquesVm(this.creaEvrp1.id_risque, this.trouverRisque1(this.creaEvrp1.id_risque));
     this.gr1 = new GraviteVm(this.creaEvrp1.id_gravEx, this.trouverGravite1(this.creaEvrp1.id_gravEx));
     this.fr1 = new FrequenceVm(this.creaEvrp1.id_FreqEx, this.trouverFrequence1(this.creaEvrp1.id_FreqEx));
     this.cr1 = new CriticiteVm(this.creaEvrp1.id_CritEx, this.trouverCriticite1(this.creaEvrp1.id_CritEx));
     this.prev1 = this.creaEvrp1.prevEx;
     this.gr1o = new GraviteVm(this.creaEvrp1.id_gravMo, this.trouverGravite1(this.creaEvrp1.id_gravMo));
     this.fr1o = new FrequenceVm(this.creaEvrp1.id_FreqMo, this.trouverFrequence1(this.creaEvrp1.id_FreqMo));
     this.cr1o = new CriticiteVm(this.creaEvrp1.id_CritMo, this.trouverCriticite1(this.creaEvrp1.id_CritMo));
     this.prev1o = this.creaEvrp1.prevMo;*/
/*this.duerB1 = new Duer(null, this.ut1, this.lieu1, this.activite1, this.danger1,
this.risque1, this.gr1, this.fr1, this.cr1, this.prev1, this.gr1o,
this.fr1o, this.cr1o, this.prev1o, null);
console.log(this.duerB1);

this.dataService.creerDuer(this.duerB1);*/
