
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
import * as jsPDF from 'jspdf';


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
  headElementsPDF = ['Id', 'ID Duer', 'Danger', 'Risque', 'Prévention', 'Budget', 'Qui ?', 'Délai', 'Fait'];
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
  entetePdf = '';
  date: Date;
  page: number;
  nbPage: number;
  dateDelai: string;


  constructor(private dataService: DataService, private _router: Router,
              private cdRef: ChangeDetectorRef, private _cookieService: CookieService) { }

  listeRisques$ = this.dataService.afficherListeRisqueduPas();
  listeRisques: RisquesVm[];
  listeUt$ = this.dataService.afficherListeUt();
  listeUt: UtVm[];

  ngOnInit() {

    this.dataService.subjectActPas.subscribe((param: PasFront[]) => {
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
    this.dataService.afficherListePas(); //initialisation subject
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
      this.entetePdf = ' par Danger :  ' + this.listePasParDanger[0].danger;
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
      this.entetePdf = ' par Risque :  ' + this.listePasParRisque[0].risque;
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
      this.entetePdf = ' par la Personne :  ' + qui;
    });
  }

  raffraichirPas() {
   this.dataService.afficherListePas();
   this.listeRisques$.subscribe((param: RisquesVm[]) => {
    this.listeRisques = param.sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0)));
  }
  );

   this.listeDanger$.subscribe((param: DangersVm[]) => {
    this.listeDanger = param.sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0)));
  }
  );
   this.listeQui$.subscribe((param: string[]) => {
    this.listeQui = param.sort((a, b) => (a.charCodeAt(0) - b.charCodeAt(0)));
  }
  );
  }

  detruirePas1(id: number, iduer: number) {

    this.dataService.detruirePas(id, iduer);
  }

  impression(entete: string) {
    // tslint:disable-next-line: no-unused-expression
    console.log(entete);
    this.page = 1;
    this.nbPage = (this.elements.length / 17);
    this.date = new Date();
    const doc = new jsPDF('landscape');
    doc.setFontSize(16);
    doc.text(entete + this.entetePdf, 10, 10);
    doc.text(this.date.toLocaleString(), 220, 10);
    doc.setFontSize(6);
    this.imprimerLigneEntete(doc);
    doc.text('_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________', 10, 25);

    console.log(this.elements.length);

    for (let i = 0, k = 0; i < this.elements.length; i++, k++) {

      if ((k % 17 === 0) && (k !== 0)) {
        doc.setFontSize(8);
        doc.text('Page :' + this.page + '/' + Math.round(this.nbPage + 0.5), 240, 200);
        this.page += 1;
        doc.setFontSize(6);
        doc.addPage();
        doc.setFontSize(16);
        doc.text(entete + this.entetePdf, 10, 10);
        doc.text(this.date.toLocaleString(), 220, 10);
        doc.setFontSize(6);
        this.imprimerLigneEntete(doc);
      }
      doc.text('_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________', 10, 25 + (10 * (k % 17)));
      this.imprimerLigne(i, doc, k);

    }
    doc.setFontSize(8);
    doc.text('Page :' + this.page + '/' + Math.round(this.nbPage + 0.5), 240, 200);
    doc.setFontSize(6);
    doc.save('duer.pdf');
    this.entetePdf = '';
  }

  imprimerLigne(index: number, doc1: jsPDF, pas: number) {
    console.log('imprimerLigne');
    doc1.text(this.elements[index].id.toString(), 10, 30 + (10 * (pas % 17)));
    doc1.text(this.elements[index].idDuer.toString(), 15, 30 + (10 * (pas % 17)));
    doc1.text(this.elements[index].danger.substring(0, 22), 35, 30 + (10 * (pas % 17)));
    doc1.text(this.elements[index].risque.substring(0, 39), 60, 30 + (10 * (pas % 17)));
    doc1.text(this.elements[index].budget.toString(), 210, 30 + (10 * (pas % 17)));
    doc1.text(this.elements[index].qui, 230, 30 + (10 * (pas % 17)));


    this.dateDelai = this.elements[index].delai.toString().substring(8, 10) +
    '/' + this.elements[index].delai.toString().substring(5, 7) + '/' + this.elements[index].delai.toString().substring(0, 4);
    doc1.text(this.dateDelai, 250, 30 + (10 * (pas % 17)));
    if (this.elements[index].etat.toString() === 'true') {
      doc1.text('  X', 270, 30 + (10 * (pas % 17)));
    }
    console.log('imprimerLigneFin');
    if (this.elements[index].action.length < 90) {
      doc1.text(this.elements[index].action.substring(0, 99), 100, 30 + (10 * (pas % 17)));
    }

    if (this.elements[index].action.length > 90) {
      doc1.text(this.elements[index].action.substring(0, 89), 100, 30 + (10 * (pas % 17)));
      doc1.text(this.elements[index].action.substring(89, 189), 100, 30 + (10 * (pas % 17)) + 2);
    }

  }

  imprimerLigneEntete(doc2: jsPDF) {
    doc2.text(this.headElementsPDF[0], 10, 20);
    doc2.text(this.headElementsPDF[1], 15, 20);
    doc2.text(this.headElementsPDF[2], 35, 20);
    doc2.text(this.headElementsPDF[3], 60, 20);
    doc2.text(this.headElementsPDF[4], 100, 20);
    doc2.text(this.headElementsPDF[5], 210, 20);
    doc2.text(this.headElementsPDF[6], 230, 20);
    doc2.text(this.headElementsPDF[7], 250, 20);
    doc2.text(this.headElementsPDF[8], 270, 20);

  }
}



