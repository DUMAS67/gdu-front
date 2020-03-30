import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-gdu-evrp',
  templateUrl: './gdu-evrp.component.html',
  styleUrls: []
})
export class GduEvrpComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  choixSortir() {

    this._router.navigate(['/gdu/deconnexion']);
  }
}
