import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-gdu-evrp',
  templateUrl: './gdu-evrp.component.html',
  styleUrls: []
})
export class GduEvrpComponent implements OnInit {

  constructor(private _router: Router) { }
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
  choixSortir() {

    this._router.navigate(['/gdu/deconnexion']);
  }

  recupUt(utValeur: any[]) {

this.recup = utValeur;
console.log(this.recup);
  }
}
