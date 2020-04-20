import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Collaborateur } from '../auth.domains';
import { CookieService } from 'ngx-cookie-service';
import { RisquesVm } from '../domains/risquesVm';
import { DataService } from '../data.service';


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
  headElementsUt = ['ID', 'UT', 'Sélection'];
  headElementsLieu = ['ID', 'Lieu', 'Sélection'];
  headElementsDg = ['ID', 'Danger', 'Sélection'];
  headElementsAct = ['ID', 'Activité', 'Sélection'];

  listeRisquesEvrp$ = this.dataService.afficherListeRisque();
  listeRisquesEvrp: RisquesVm[];

  ngOnInit() {

    this.listeRisquesEvrp$.subscribe((param: RisquesVm[]) => {
      this.listeRisquesEvrp = param.filter(a => a).sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0))); }
      );

    console.log('AAAAAA4' + this.listeRisquesEvrp);
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
