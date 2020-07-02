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
import { Ut } from '../domains/Ut';
import { DuerVM } from '../domains/DuerVM';
import { PasVm } from '../domains/PasVm';
import { Duer } from '../domains/Duer';
import { async } from 'rxjs/internal/scheduler/async';
import { AsyncPipe } from '@angular/common';
import { Duer1 } from '../domains/Duer1';
import { Observable } from 'rxjs';
import { FnParam } from '@angular/compiler/src/output/output_ast';
import { NgForm } from '@angular/forms';

/* Module qui affiche l'interface utilisateur qui créé des Evrp, des UT, des Lieux, des Activités,
des Dangers
*/
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


  listeLieu: LieuVm[];
  listeCriticite$ = this.dataService.afficherListeCriticite();
  listeCriticite: CriticiteVm[];


  listeUt: UtVm[];

  listeGravite$ = this.dataService.afficherListeGravite();
  listeGravite: GraviteVm[];
  listeFrequence$ = this.dataService.afficherListeFrequence();
  listeFrequence: FrequenceVm[];

  listeActivite: ActivitesVm[];

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
    /* Initialise les listes de choix des items pour la création des Evrp
    Gravité
    Risques
    Freuence
    Lieu
    Activité
    Dangers
   */

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

    // !la listeUt reçoit les dernières données du Subject
    // Connexion de listeUt sur subject par souscription
    this.dataService.subjectActUt.subscribe((param: UtVm[]) => {
      this.listeUt = param.sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0)));

    }
    );


    // Abonnement Lieu
    // !la listeLieu reçoit les dernières données du Subject
    // Connexion de listeLieu sur subject par souscription
    this.dataService.subjectActLieu.subscribe((param: LieuVm[]) => {
      this.listeLieu = param.sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0)));

    }
    );

    // Abonnement Activite
    // !la liste Danger reçoit les dernières données du Subject
    // Connexion de listeLieu sur subject par souscription
    this.dataService.subjectActActivite.subscribe((param: ActivitesVm[]) => {
      this.listeActivite = param.sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0)));

    }
    );

    // Abonnement Danger
    // !la liste Danger reçoit les dernières données du Subject
    // Connexion de listeLieu sur subject par souscription
    this.dataService.subjectActDanger.subscribe((param: DangersVm[]) => {
      this.listeDanger = param.sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0)));

    }
    );

    this.dataService.afficherListeUt(); // Initialise le subject à la liste Ut de la Base
    this.dataService.afficherListeLieu(); // Initialise le subject à la liste Lieu de la Base
    this.dataService.afficherListeActivite(); // Initialise le subject à la liste Lieu de la Base
    this.dataService.afficherListeDanger(); // Initialise le subject à la liste Lieu de la Base

  }// Fin NgOnInit

  // Rafraichie la liste Ut
  rafraichirListeUt() {
    this.dataService.afficherListeUt();

  }
  // Récupère la valeur d'un item d'une liste
  // id = valeur de l'indice d'une valeur à modifié dans sa liste
  // valeur = valeur de l'id
  recupItem(id: number, valeur: string) {

    this.recupNom = valeur;
    this.recupId = id;
    this.recupNomAModifier = valeur;
  }

  // Donne l'autorisation  pour être en mode affichage Administrateur ou Utilisateur
  afficherModif(): boolean {
    this.collaborateurConnecte = JSON.parse(this._cookieService.get('col'));
    return (this.collaborateurConnecte.roles[0] === this.collaborateurConnecte.ADMIN);
  }
  // Crée une Unité de Travail
  creerUt1(nouveauNomUt: string) {
    this.dataService.creerUt(nouveauNomUt);
  }
  // Modifie une Unité de Travail
  // idav = id de L'UT à modifiéer dans la liste des UT
  // nomap = nouveau nom de l'UT
  modifUt1(idav: number, nomap: string) {
    this.dataService.modifUt(idav, nomap);
  }
  // Crée un Lieu
  creerLieu1(nouveauNomLieu: string) {
    this.dataService.creerLieu(nouveauNomLieu);
  }
  // Modifie un Lieu
  // idav = id du Lieu à modifiéer dans la liste des Lieu
  // nomap = nouveau nom de Lieu
  modifLieu1(idav: number, nomap: string) {
    this.dataService.modifLieu(idav, nomap);
  }

  // Crée une Activité
  creerActivite1(nouveauNomActivite: string) {
    this.dataService.creerActivite(nouveauNomActivite);
  }
  // Modifie une Activité
  // idav = id de Activité à modifier dans la liste des Activités
  // nomap = nouveau nom de Activité

  modifActivite1(idav: number, nomap: string) {
    this.dataService.modifActivite(idav, nomap);
  }
  // Crée un Danger
  creerDanger1(nouveauNomActivite: string) {

    this.dataService.creerDanger(nouveauNomActivite);
  }
  // Modifie un Danger
  // idav = id de Danger à modifiéer dans la liste des Dangers
  // nomap = nouveau nom de Danger

  modifDanger1(idav: number, nomap: string) {
    this.dataService.modifDanger(idav, nomap);
  }
  // Trouver une Unité de Travail par son identifiant

  trouverUt1(id: number): Observable<UtVm> {

    return this.dataService.trouverUt(id);

  }
  // Trouver un Lieu dans la SGBD par son identifiant
  trouverLieu1(id: number): string {

    this.dataService.trouverLieu(id).subscribe(
      (param: LieuVm) => {
        this.nomLieu = param.nom;
      }
    );
    return this.nomLieu;
  }

  // Trouver une activité dans la SGBD par son identifiant
  trouverActivite1(id: number): string {

    this.dataService.trouverActivite(id).subscribe(
      (param: ActivitesVm) => {
        this.nomActivite = param.nom;
      }
    );
    return this.nomLieu;
  }

  // Trouver un Danger dans la SGBD par son identifiant
  trouverDanger1(id: number): string {

    this.dataService.trouverDanger(id).subscribe(
      (param: DangersVm) => {
        this.nomDanger = param.nom;
      }
    );
    return this.nomDanger;
  }

  // Trouver un Risque dans la SGBD par son identifiant
  trouverRisque1(id: number): string {

    this.dataService.trouverRisque(id).subscribe(
      (param: RisquesVm) => {
        this.nomRisque = param.nom;
      }
    );
    return this.nomRisque;
  }

  // Trouver une Fréquence de la liste des fréquences par son identifiant
  trouverFrequence1(id: number): number {

    this.dataService.trouverFrequence(id).subscribe(
      (param: FrequenceVm) => {
        this.valeurFrequence = param.valeur;
      }
    );
    return this.valeurFrequence;
  }
  // Trouver une Gravité de la liste des fréquences par son identifiant

  trouverGravite1(id: number): number {

    this.dataService.trouverGravite(id).subscribe(
      (param: GraviteVm) => {
        this.valeurGravite = param.valeur;
      }
    );
    return this.valeurGravite;
  }

  // Crée un Evrp de Risque 1

  // utNom = indice de la liste UT pour l'Unité de travail qui définie l'Evrp
  // lieuNom = indice de la liste Lieu pour le Lieu qui définie l'Evrp
  // activiteNom = indice de la liste Activité pour l'Activité qui définie l'Evrp
  // dangerNom = indice de la liste Danger pour le Danger qui définie l'Evrp
  // risqueNom = indice de la liste Risque pour le Risque qui définie l'Evrp
  // gr1Nom = indice de la liste Gravité pour la Gravité qui définie l'Evrp (prev. existante)
  // frq1Nom = indice de la liste Fréquence pour la Fréquence qui définie l'Evrp (prev. existante)
  // prev1Ex = caractérisation de la prévention existante pour l'EVrp
  // gros1Nom = indice de la liste Gravité pour la Gravité qui définie l'Evrp (prev. à mettre en oeuvre)
  // frq1oNom = indice de la liste Fréquence pour la Fréquence qui définie l'Evrp (prev. à mettre en oeuvre)
  // prev1Mo = caractérisation de la prévention à mettre en oeuvre pour l'EVrp

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
  }

  // Crée un evrp de risque 2

  // utNom = indice de la liste UT pour l'Unité de travail qui définie l'Evrp
  // lieuNom = indice de la liste Lieu pour le Lieu qui définie l'Evrp
  // activiteNom = indice de la liste Activité pour l'Activité qui définie l'Evrp
  // dangerNom = indice de la liste Danger pour le Danger qui définie l'Evrp
  // risqueNom = indice de la liste Risque pour le Risque qui définie l'Evrp
  // gr1Nom = indice de la liste Gravité pour la Gravité qui définie l'Evrp (prev. existante)
  // frq1Nom = indice de la liste Fréquence pour la Fréquence qui définie l'Evrp (prev. existante)
  // prev1Ex = caractérisation de la prévention existante pour l'EVrp
  // gros1Nom = indice de la liste Gravité pour la Gravité qui définie l'Evrp (prev. à mettre en oeuvre)
  // frq1oNom = indice de la liste Fréquence pour la Fréquence qui définie l'Evrp (prev. à mettre en oeuvre)
  // prev1Mo = caractérisation de la prévention à mettre en oeuvre pour l'EVrp
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

  }
  // Indique que les données de Evrp pour risque 1 sont valides
  confirmerDonneesRisque1() { this.confirmeDonneesRisque1 = true; }
  // Indique que les données de Evrp pour risque 2 sont valides
  confirmerDonneesRisque2() { this.confirmeDonneesRisque2 = true; }

  reinitialiser() { this.creaEvrp1Ok = false; }



  // Sort de la page Evrp
  fermerEvrp() {
    this._router.navigate(['/gdu']);
  }

  // Calcule la valeur de criticité
  // valeur1 = rang de la liste de sélection de Gravité
  // valeur2 = rang de la liste de sélection des Fréquences
  crit(valeur1: number, valeur2: number): number {

    this.criticite = this.listeGravite[valeur1 - 1].valeur * this.listeFrequence[valeur2 - 1].valeur;
    return this.criticite;
  }


  // Rafraichie la page en entier de saisie de l'Evrp
  rafPageEvrp() {
    this.finValid = true;
    this.confirmeDonneesRisque1 = false;
    this.confirmeDonneesRisque2 = false;
    this.creaEvrp1Ok = false;
    this.creaEvrp2Ok = false;
  }
}

