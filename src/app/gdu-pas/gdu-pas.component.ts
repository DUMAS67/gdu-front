
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Collaborateur } from '../auth.domains';
import { RisquesVm } from '../domains/RisquesVm';
import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { stringify } from 'querystring';
import { DangersVm } from '../domains/DangersVm';
import { UtVm } from '../domains/UtVm';
import { PasVm } from '../domains/PasVm';
import { PasFront } from '../domains/PasFront';


@Component({
  selector: 'app-gdu-pas',
  templateUrl: './gdu-pas.component.html',
  styleUrls: []
})
export class GduPasComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;

  elements: any = [];
  previous: any = [];
  headElements = ['Id', 'ID Duer', 'Danger', 'Risque', 'Prévention', 'Budget', 'Qui ?', 'Délai', 'Fait'];
  headElements1 = ['Modification'];
  collaborateurConnecte: Collaborateur;
  collaborateurConnexion1: any;
  listePas$ = this.dataService.afficherListePas();
  listePas: PasFront[];
  MaxVisibleItemsNumber = 10;
  delai1: string;
  listeDanger: DangersVm[];
  listeDanger$ = this.dataService.afficherListeDangerduPas();
  listePasParDanger$: Observable<PasFront[]>;
  listePasParDanger: PasFront[];
  listeQui$ = this.dataService.afficherListeQuiduPas();
  listeQui: string[];
  listePasParRisque$: Observable<PasFront[]>;
  listePasParRisque: PasFront[];
  listePasParQui$: Observable<PasFront[]>;
  listePasParQui: PasFront[];


  constructor(private dataService: DataService, private _router: Router,
    private cdRef: ChangeDetectorRef, private _cookieService: CookieService) { }

  listeRisques$ = this.dataService.afficherListeRisqueduPas();
  listeRisques: RisquesVm[];
  listeUt$ = this.dataService.afficherListeUt();
  listeUt: UtVm[];

  ngOnInit() {

    this.listePas$.subscribe((param: PasFront[]) => {
      this.elements = param.map(c => new PasFront(
        c.id, c.idDuer, c.danger, c.risque, c.action, c.budget, c.qui, c.delai, c.etat))
        .sort((a, b) => (a.action.charCodeAt(0) - b.action.charCodeAt(0)));
      this.mdbTable.setDataSource(this.elements);
      console.log(this.elements[0]);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    }
    );

    this.listeRisques$.subscribe((param: RisquesVm[]) => {
      this.listeRisques = param.sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0)));
    }
    );

    this.listeDanger$.subscribe((param: DangersVm[]) => {
      this.listeDanger = param.sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0)));
    }
    );

    this.listeUt$.subscribe((param: UtVm[]) => {
      this.listeUt = param.sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0)));
    }
    );

    this.listeQui$.subscribe((param: string[]) => {
      this.listeQui = param.sort((a, b) => (a.charCodeAt(0) - b.charCodeAt(0)));
    }
    );

  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.MaxVisibleItemsNumber);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
    console.log('AAAAAA4' + this.listeRisques$);
  }

  afficherModif(): boolean {

    this.collaborateurConnecte = JSON.parse(this._cookieService.get('col'));
    return (this.collaborateurConnecte.roles[0] === this.collaborateurConnecte.ADMIN);
  }

  /*delaiD(date: Date): string {

    this.delai1 = date.toDateString();
    console.log(this.delai1);
    return this.delai1;
  }*/

  modifierPas1(id: number,
    idDuer: number,
    action: string,
    budget: number,
    qui: string,
    delai: string,
    etat: boolean) {
    this.dataService.modifierPas(new PasVm(id, idDuer, action, budget, qui, new Date(delai), etat));
  }




  afficheListePasParDanger(danger: number) {

    this.listePasParDanger$ = this.dataService.afficherListePasFrontParDanger(danger);
    this.listePasParDanger$.subscribe((param: PasFront[]) => {
      this.listePasParDanger = param.map(a => a).sort((a, b) => (a.id - b.id));
      this.mdbTable.setDataSource(this.listePasParDanger);
      console.log(this.listePasParDanger[0].id);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
      this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.MaxVisibleItemsNumber);
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
      this.cdRef.detectChanges();
    });
  }

  afficheListePasParRisque(risque: number) {

    this.listePasParRisque$ = this.dataService.afficherListePasFrontParRisque(risque);
    this.listePasParRisque$.subscribe((param: PasFront[]) => {
      this.listePasParRisque = param.map(a => a).sort((a, b) => (a.id - b.id));
      this.mdbTable.setDataSource(this.listePasParRisque);
      console.log(this.listePasParRisque[0].id);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
      this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.MaxVisibleItemsNumber);
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
      this.cdRef.detectChanges();
    });
  }

  afficheListePasParQui(qui: string) {

    this.listePasParQui$ = this.dataService.afficherListePasFrontParQui(qui);
    this.listePasParQui$.subscribe((param: PasFront[]) => {
      this.listePasParQui = param.map(a => a).sort((a, b) => (a.danger.charCodeAt(0) - b.danger.charCodeAt(0)));
      this.mdbTable.setDataSource(this.listePasParQui);
      console.log(this.listePasParQui[0].qui);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
      this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.MaxVisibleItemsNumber);
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
      this.cdRef.detectChanges();
    });
  }

  raffraichirPas() {
    this.listePas$.subscribe((param: PasFront[]) => {
      this.elements = param.map(c => new PasFront(
        c.id, c.idDuer, c.danger, c.risque, c.action, c.budget, c.qui, c.delai, c.etat))
        .sort((a, b) => (a.action.charCodeAt(0) - b.action.charCodeAt(0)));
      this.mdbTable.setDataSource(this.elements);
      console.log(this.elements[0]);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
      this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.MaxVisibleItemsNumber);
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
      this.cdRef.detectChanges();
    }
    );
  }

  detruirePas1(id: number, iduer: number) {

    this.dataService.detruirePas(id, iduer);
  }

}



