
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { Router } from '@angular/router';


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
    }, ]
  previous: any = [];
  headElements = ['ID Duer', 'Danger', 'Risque',
  'Prévention','Budget', 'Qui ?', 'Délai', 'Fait', 'Modification'];

  constructor(private _router: Router, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
  choixSortir() {

    this._router.navigate(['/gdu/deconnexion']);
  }

  }



