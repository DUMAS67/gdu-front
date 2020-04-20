
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Collaborateur } from '../auth.domains';
import { RisquesVm } from '../domains/risquesVm';
import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { stringify } from 'querystring';
import { DangersVm } from '../domains/dangersVM';
import { UtVm } from '../domains/UtVm';


@Component({
  selector: 'app-gdu-pas',
  templateUrl: './gdu-pas.component.html',
  styleUrls: []
})
export class GduPasComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;

  elements: any = [
    {
      id: 1,
      heading1: 'Utiliser une Ponçeuse',
      heading2: 'Inhalation Sciure',
      heading3: 'Port du Masque FFP2 Obligatoire',
      heading4: '1000',
      heading5: 'Bruno',
      heading6: '04/05/2020',
      heading7: 'true'

    },
    {
      id: 2,
      heading1: 'Réception meubles',
      heading2: 'Chute de hauteur',
      heading3: 'Camion avec haillon',
      heading4: '15000',
      heading5: 'Pascal',
      heading6: '04/08/2020',
      heading7: 'true'
    }, ];
  previous: any = [];
  headElements = ['ID Duer', 'Danger', 'Risque', 'Prévention', 'Budget', 'Qui ?', 'Délai', 'Fait'];
  headElements1 = ['Modification'];
  collaborateurConnecte: Collaborateur;
  collaborateurConnexion1: any;
  test: RisquesVm[] = [{id: 1, nom: 'AAAAA'}, {id: 2, nom: 'ZZZZZZ'}];



  constructor(private dataService: DataService, private _router: Router,
              private cdRef: ChangeDetectorRef, private _cookieService: CookieService) { }

  listeRisques$ = this.dataService.afficherListeRisque();
  listeRisques: RisquesVm[];
  listeUt$ = this.dataService.afficherListeUt();
  listeUt: UtVm[];

  ngOnInit() {
    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
    this.listeRisques$.subscribe((param: RisquesVm[]) => {
      this.listeRisques = param.filter(a => a).sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0))); }
      );
    this.listeUt$.subscribe((param: RisquesVm[]) => {
        this.listeUt = param.filter(a => a).sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0))); }
        );
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
    // tslint:disable-next-line: whitespace
    console.log('AAAAAA4' + this.listeRisques$);
      }

  afficherModif(): boolean {

    this.collaborateurConnecte = JSON.parse(this._cookieService.get('col'));
    return (this.collaborateurConnecte.roles[0] === this.collaborateurConnecte.ADMIN);
  }

}



