import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Collaborateur } from '../auth.domains';
import { CookieService } from 'ngx-cookie-service';
import { RisquesVm } from '../domains/risquesVm';
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


@Component({
  selector: 'app-gdu-evrp',
  templateUrl: './gdu-evrp.component.html',
  styleUrls: []
})
export class GduEvrpComponent implements OnInit {

  collaborateurConnecte: Collaborateur;

  constructor(private dataService: DataService, private _router: Router,
              private _cookieService: CookieService) { }
  recupId: number;
  recupNom: string;

  headElementsUt = ['UT', 'Sélection'];
  headElementsLieu = ['Lieu', 'Sélection'];
  headElementsDg = ['Danger', 'Sélection'];
  headElementsAct = ['Activité', 'Sélection'];

  listeLieu$ = this.dataService.afficherListeLieu();
  listeLieu: LieuVm[];
  listeCriticite$ = this.dataService.afficherListeCriticite();
  listeCriticite: CriticiteVm[];
  listeUt$ = this.dataService.afficherListeUt();
  listeUt: UtVm[];
  listeGravite$ = this.dataService.afficherListeGravite();
  listeGravite: GraviteVm[];
  listeFrequence$ = this.dataService.afficherListeFrequence();
  listeFrequence: FrequenceVm[];
  listeActivite$ = this.dataService.afficherListeActivite();
  listeActivite: ActivitesVm[];
  listeDanger$ = this.dataService.afficherListeDanger();
  listeDanger: DangersVm[];
  listeRisque$ = this.dataService.afficherListeRisque();
  listeRisque: RisquesVm[];
  text: string;
  recupNomAModifier: string;
  modifNomUt: string;
  modifNomLieu: string;
  modifNomActivite: string;
  modifNomDanger: string;
  creerPrev1ex: string;
  creerPrev1Mo: string;
  creerPrev2ex: string;
  creerPrev2Mo: string;
  CreaEvrp1: DuerVM = new DuerVM(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  CreaEvrp2: DuerVM = new DuerVM(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  criticite: number;
  valeur : number;
  ngOnInit() {


    this.listeLieu$.subscribe((param: LieuVm[]) => {
      this.listeLieu = param.filter(a => a).sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0)));
    }
    );
    this.listeUt$.subscribe((param: UtVm[]) => {
      this.listeUt = param.filter(a => a).sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0)));
    }
    );

    this.listeCriticite$.subscribe((param: CriticiteVm[]) => {
      this.listeCriticite = param.filter(a => a).sort((a, b) => (a.valeur - b.valeur));
    }
    );

    this.listeGravite$.subscribe((param: GraviteVm[]) => {
      this.listeGravite = param.filter(a => a).sort((a, b) => (a.valeur - b.valeur));
    }
    );

    this.listeActivite$.subscribe((param: ActivitesVm[]) => {
      this.listeActivite = param.filter(a => a).sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0)));
    }
    );

    this.listeDanger$.subscribe((param: DangersVm[]) => {
      this.listeDanger = param.filter(a => a).sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0)));
    }
    );
    this.listeRisque$.subscribe((param: RisquesVm[]) => {
      this.listeRisque = param.filter(a => a).sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0)));
    }
    );
    this.listeFrequence$.subscribe((param: FrequenceVm[]) => {
      this.listeFrequence = param.filter(a => a).sort((a, b) => (a.valeur - b.valeur));
    }
    );
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

  creerDuer(
            utsNom: number,
            lieussNom: number, activitesNom: number, dangersNom: number,
            risques1Nom: number, gr1sNom: number, frq1sNom: number,
            prev1Ex: string, gros1Nom: number, frq1osNom: number,
            prev1Mo: string, rsq2sNom: number, gr2sNom: number, frq2sNom: number,
            prev2Ex: string, gr2osNom: number, frq2osNom: number,
            prev2Mo: string) {

    this.CreaEvrp1.id_UT = utsNom;
    this.CreaEvrp1.id_lieu = lieussNom;
    this.CreaEvrp1.id_activite = activitesNom;
    this.CreaEvrp1.id_danger = dangersNom;
    this.CreaEvrp1.id_risque = risques1Nom;
    this.CreaEvrp1.id_gravEx = gr1sNom;
    this.CreaEvrp1.id_FreqEx = frq1sNom;
    this.CreaEvrp1.id_CritEx = gr1sNom * frq1sNom;
    this.CreaEvrp1.prevEx = prev1Ex;
    this.CreaEvrp1.id_gravMo = gros1Nom;
    this.CreaEvrp1.id_FreqMo = frq1osNom;
    this.CreaEvrp1.id_CritMo = gros1Nom * frq1osNom;
    this.CreaEvrp1.prevMo = prev1Mo;

    this.CreaEvrp2.id_UT = utsNom;
    this.CreaEvrp2.id_lieu = lieussNom;
    this.CreaEvrp2.id_activite = activitesNom;
    this.CreaEvrp2.id_danger = dangersNom;
    this.CreaEvrp2.id_risque = rsq2sNom;
    this.CreaEvrp2.id_gravEx = gr2sNom;
    this.CreaEvrp2.id_FreqEx = frq2sNom;
    this.CreaEvrp2.id_CritEx = gr2sNom * frq2sNom;
    this.CreaEvrp2.prevEx = prev2Ex;
    this.CreaEvrp2.id_gravMo = gr2osNom;
    this.CreaEvrp2.id_FreqMo = frq2osNom;
    this.CreaEvrp2.id_CritMo = gr2osNom * frq2osNom;
    this.CreaEvrp2.prevMo = prev2Mo;

    /*this.CreaEvrp2 = this.CreaEvrp1;
    this.CreaEvrp2.id_risque = rsq2sNom;
    this.CreaEvrp2.id_gravEx = gr2sNom;
    this.CreaEvrp2.id_FreqEx = frq2sNom;
    this.CreaEvrp2.id_CritEx = gr2sNom * frq2sNom;
    this.CreaEvrp2.prevEx = prev2Ex;
    this.CreaEvrp2.id_gravMo = gr2osNom;
    this.CreaEvrp2.id_FreqMo = frq2osNom;
    this.CreaEvrp2.id_CritMo = gr2osNom * frq2osNom;
    this.CreaEvrp2.prevMo = prev2Mo;*/
    console.log('***************Risque1***************');
    console.log ('UT : ' + this.CreaEvrp1.id_UT);
    console.log ('Lieu : '+ this.CreaEvrp1.id_lieu);
    console.log ('Activite :'+ this.CreaEvrp1.id_activite);
    console.log ('Danger :' + this.CreaEvrp1.id_danger);
    console.log ('Risque 1 :' + this.CreaEvrp1.id_risque);
    console.log ('Gravité 1 Existante : ' +this.CreaEvrp1.id_gravEx);
    console.log ('Fréquence 1 Existante : ' + this.CreaEvrp1.id_FreqEx);
    console.log ('Créativité 1 Existante : ' + this.CreaEvrp1.id_CritEx);
    console.log ('Prévention 1 Existante : ' + this.CreaEvrp1.prevEx);
    console.log ('Gravité 1 MO : ' + this.CreaEvrp1.id_gravMo);
    console.log ('Fréquence 1 MO : ' + this.CreaEvrp1.id_FreqMo);
    console.log ('Criticité 1 MO : ' + this.CreaEvrp1.id_CritMo);
    console.log ('Prévention 1 MO: ' + this.CreaEvrp1.prevMo);
    console.log('***************Risque2**********************');
    console.log ('UT : ' + this.CreaEvrp2.id_UT);
    console.log ('Lieu : '+ this.CreaEvrp2.id_lieu);
    console.log ('Activite :'+ this.CreaEvrp2.id_activite);
    console.log ('Danger :' +this.CreaEvrp2.id_danger);
    console.log ('Risque 2 :' +this.CreaEvrp2.id_risque);
    console.log ('Gravité 2 Existante : ' +this.CreaEvrp2.id_gravEx);
    console.log ('Fréquence 2 Existante : ' + this.CreaEvrp2.id_FreqEx);
    console.log ('Créativité 2 Existante : ' + this.CreaEvrp2.id_CritEx);
    console.log ('Prévention 2 Existante : ' + this.CreaEvrp2.prevEx);
    console.log ('Gravité 2 MO : '+ this.CreaEvrp2.id_gravMo);
    console.log ('Fréquence 2 MO : '+this.CreaEvrp2.id_FreqMo);
    console.log ('Criticité 2 MO : '+ this.CreaEvrp2.id_CritMo);
    console.log ('Prévention 2 MO: ' +this.CreaEvrp2.prevMo);


  }
fermerEvrp() {
this._router.navigate(['/gdu']);
}

crit(valeur1: number, valeur2: number): number {
  this.valeur = valeur2 * valeur1;
  console.log('valeurx = ' + this.valeur);

  this.criticite = this.dataService.trouverCriticite(this.valeur);
  return this.criticite;
}
}
