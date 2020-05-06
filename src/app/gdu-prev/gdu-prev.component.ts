
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Collaborateur } from '../auth.domains';
import { GraviteVm } from '../domains/Gravite';
import { FrequenceVm } from '../domains/FrequenceVm';
import { CriticiteVm } from '../domains/CriticiteVm';
import { UtVm } from '../domains/UtVm';
import { LieuVm } from '../domains/LieuVm';
import { DataService } from '../data.service';


@Component({
  selector: 'app-gdu-prev',
  templateUrl: './gdu-prev.component.html',
  styleUrls: ['./gdu-prev.component.css']
})
export class GduPrevComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;

  elements1: any = [
    {
      id: 1,
      heading1: 'Revalorisation',
      heading2: 'AT Menuiserie',
      heading3: 'Ponçage',
      heading4: 'Utiliser une Ponçeuse',
      heading5: 'Toxicité',
      heading6: 2,
      heading7: 2,
      heading8: 4,
      heading9: 'Port du Masque FFP2 Obligatoire',
      heading10: '',
      heading11: ''
    },
    {
      id: 2,
      heading1: 'Revalorisation',
      heading2: 'Extérieur',
      heading3: 'Réception meubles',
      heading4: 'Transfert meubles',
      heading5: 'Chutes de plain-pied & chutes en hauteur',
      heading6: 15,
      heading7: 1,
      heading8: 15,
      heading9: 'Camion avec haillon',
      heading10: '',
      heading11: ''
    },]
  previous: any = [];
  headElements1 = ['ID', 'UT', 'Lieu', 'Activité', 'Danger', 'Risque',
    'G', 'F', 'C', 'Prévention à mettre en place'];
  headElements2 = ['Plan Actions', 'Modification'];
  collaborateurConnecte: Collaborateur;
  listeLieu$ = this.dataService.afficherListeLieu();
  listeLieu: LieuVm[];
  listeUt$ = this.dataService.afficherListeUt();
  listeUt: UtVm[];
  listeGravite$ = this.dataService.afficherListeGravite();
  listeGravite: GraviteVm[];
  listeFrequence$ = this.dataService.afficherListeFrequence();
  listeFrequence: FrequenceVm[];
  constructor(private dataService: DataService, private _router: Router,
    private _cookieService: CookieService, private cdRef: ChangeDetectorRef) { }


  ngOnInit() {


    this.mdbTable.setDataSource(this.elements1);
    this.elements1 = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();

    this.listeLieu$.subscribe((param: LieuVm[]) => {
      this.listeLieu = param.filter(a => a).sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0)));
    }
    );
    this.listeUt$.subscribe((param: UtVm[]) => {
      this.listeUt = param.filter(a => a).sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0))); }
      );


    this.listeGravite$.subscribe((param: GraviteVm[]) => {
          this.listeGravite = param.filter(a => a).sort((a, b) => (a.valeur - b.valeur)); }
          );
    this.listeFrequence$.subscribe((param: FrequenceVm[]) => {
            this.listeFrequence = param.filter(a => a).sort((a, b) => (a.valeur - b.valeur)); }
            );
  }

  afficherModif(): boolean {

    this.collaborateurConnecte = JSON.parse(this._cookieService.get('col'));
    return (this.collaborateurConnecte.roles[0] === this.collaborateurConnecte.ADMIN);
  }




}


