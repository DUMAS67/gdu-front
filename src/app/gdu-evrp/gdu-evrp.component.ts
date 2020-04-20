import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Collaborateur } from '../auth.domains';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-gdu-evrp',
  templateUrl: './gdu-evrp.component.html',
  styleUrls: []
})
export class GduEvrpComponent implements OnInit {
  collaborateurConnecte: Collaborateur;

  constructor(private _router: Router, private _cookieService: CookieService) { }
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
  headElements3 = ['ID', 'UT', 'Sélection'];

  ngOnInit() {

  }


  recupUt(utValeur: any[]) {

this.recup = utValeur;
console.log(this.recup);
  }

  afficherModif(): boolean {

    this.collaborateurConnecte = JSON.parse(this._cookieService.get('col'));
    return (this.collaborateurConnecte.roles[0] === this.collaborateurConnecte.ADMIN);
  }
}
