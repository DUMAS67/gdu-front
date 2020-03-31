
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { Router } from '@angular/router';


@Component({
  selector: 'app-gdu-duer',
  templateUrl: './gdu-duer.component.html',
  styleUrls: []
})
export class GduDuerComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;

  elements: any = [
    {
      id: 1,
      heading1: 'Revalorisation',
      heading2: 'AT Menuiserie',
      heading3: 'Ponçage',
      heading4: 'Utiliser une Ponçeuse',
      heading5: 'Inhalation Sciure',
      heading6: 5,
      heading7: 3,
      heading8: 15,
      heading9: '-',
      heading10: 2,
      heading11: 2,
      heading12: 4,
      heading13: 'Port du Masque FFP2 Obligatoire',
      heading14: '',
      heading15: ''
    },
    {
      id: 2,
      heading1: 'Revalorisation',
      heading2: 'Extérieur',
      heading3: 'Réception meubles',
      heading4: 'Chute de hauteur',
      heading5: 'Blessure Corporel',
      heading6: 15,
      heading7: 2,
      heading8: 30,
      heading9: '-',
      heading10: 15,
      heading11: 1,
      heading12: 15,
      heading13: 'Camion avec haillon',
      heading14: '',
      heading15: ''
    }, ]
  previous: any = [];
  headElements = ['ID', 'UT', 'Lieu', 'Activité', 'Danger', 'Risque', 'G', 'F', 'C', 'Prévention','G','F','C','Prévention','Plan Actions','Action'];

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

