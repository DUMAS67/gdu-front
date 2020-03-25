
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';


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
      heading2: 'Menuiserie',
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
    }]
  previous: any = [];
  headElements = ['ID', 'UT', 'Lieu', 'Activité', 'Danger', 'Risque', 'G', 'F', 'C', 'Prévention','G1','F','C','Prévention','Pas','Action'];

  constructor(private cdRef: ChangeDetectorRef) { }

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

}

