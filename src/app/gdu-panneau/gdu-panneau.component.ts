import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { CreationVm } from '../domains/CreationVm';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-gdu-panneau',
  templateUrl: './gdu-panneau.component.html',
  styleUrls: []
})

/* Présentation des données du Parchemin ainsi que la présentation
de la construction d'un DUER */

export class GduPanneauComponent implements OnInit {

  constructor(private _router: Router, private dataService: DataService,private cookieService: CookieService) { }



  ngOnInit() {



  }

}
