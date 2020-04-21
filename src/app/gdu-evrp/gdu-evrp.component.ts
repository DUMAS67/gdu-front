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


@Component({
  selector: 'app-gdu-evrp',
  templateUrl: './gdu-evrp.component.html',
  styleUrls: []
})
export class GduEvrpComponent implements OnInit {
  collaborateurConnecte: Collaborateur;

  constructor(private dataService: DataService, private _router: Router,
     private _cookieService: CookieService) { }
recup: any;
  elements3: any = [{
    id: '1',
    first: 'Unité de Travail1'
  }, { id: '2', first: 'Unité de Travail2' }, {
    id: '3', first: 'Unité de Travail3'
  }, {
    id: '4',first: 'Unité de Travail4'
  }, {
    id: '5', first: 'Unité de Travail5'
  }, {    id: '6', first: 'Unité de Travail6'
  }

  ];
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
  ngOnInit() {

    this.listeLieu$.subscribe((param: LieuVm[]) => {
      this.listeLieu = param.filter(a => a).sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0)));
    }
    );
    this.listeUt$.subscribe((param: UtVm[]) => {
      this.listeUt = param.filter(a => a).sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0))); }
      );

    this.listeCriticite$.subscribe((param: CriticiteVm[]) => {
        this.listeCriticite = param.filter(a => a).sort((a, b) => (a.valeur - b.valeur)); }
        );

    this.listeGravite$.subscribe((param: GraviteVm[]) => {
          this.listeGravite = param.filter(a => a).sort((a, b) => (a.valeur - b.valeur)); }
          );

    this.listeActivite$.subscribe((param: ActivitesVm[]) => {
            this.listeActivite = param.filter(a => a).sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0))); }
            );

    this.listeDanger$.subscribe((param: DangersVm[]) => {
              this.listeDanger = param.filter(a => a).sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0))); }
              );
    this.listeRisque$.subscribe((param: RisquesVm[]) => {
                this.listeRisque = param.filter(a => a).sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0))); }
                );
    this.listeFrequence$.subscribe((param: FrequenceVm[]) => {
                  this.listeFrequence = param.filter(a => a).sort((a, b) => (a.valeur - b.valeur)); }
                  );
  }


  recupItem(utValeur: any[]) {

this.recup = utValeur;
console.log(this.recup);
  }

  afficherModif(): boolean {

    this.collaborateurConnecte = JSON.parse(this._cookieService.get('col'));
    return (this.collaborateurConnecte.roles[0] === this.collaborateurConnecte.ADMIN);
  }
}
