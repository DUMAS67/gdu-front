
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Collaborateur } from '../auth.domains';
import { DataService } from '../data.service';
import { LieuVm } from '../domains/LieuVm';
import { CriticiteVm } from '../domains/CriticiteVm';
import { Observable } from 'rxjs';
import { UtVm } from '../domains/UtVm';
import { GraviteVm } from '../domains/Gravite';
import { FrequenceVm } from '../domains/FrequenceVm';


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
    },]
  previous: any = [];
  headElements = ['ID', 'UT', 'Lieu', 'Activité', 'Danger', 'Risque',
    'G', 'F', 'C', 'Prévention', 'G', 'F', 'C', 'Prévention'];
  headElements1 = ['Plan Actions', 'Modification'];
  collaborateurConnexion: any;


  constructor(private dataService: DataService, private _router: Router, private _cookieService: CookieService, private cdRef: ChangeDetectorRef, private _authSrv: AuthService) { }

  collaborateurConnecte: Collaborateur;
  listeLieu$ = this.dataService.afficherListeLieu();
  listeLieu: LieuVm[];
  listeCriticite$ = this.dataService.afficherListeCriticite();
  listeCriticite: CriticiteVm[];
  listeUt$ = this.dataService.afficherListeUt();
  listeUt: UtVm[];
  listeGravite$ = this.dataService.afficherListeGravite();
  listeGravite: GraviteVm[];
  listeFrequence$ = this.dataService.afficherListeFrequence();
  listeFrequence: FrequenceVm[];

  ngOnInit() {


    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
    this.listeLieu$.subscribe((param: LieuVm[]) => {
      this.listeLieu = param.filter(a => a).sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0)));
    }
    );
    this.listeUt$.subscribe((param: UtVm[]) => {
      this.listeUt = param.filter(a => a).sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0))); }
      );

    this.listeCriticite$.subscribe((param: CriticiteVm[]) => {
        this.listeCriticite = param.filter(a => a).sort((a, b) => (a.valeur - b.valeur)); }
        );

    this.listeGravite$.subscribe((param: GraviteVm[]) => {
          this.listeGravite = param.filter(a => a).sort((a, b) => (a.valeur - b.valeur)); }
          );
    this.listeFrequence$.subscribe((param: FrequenceVm[]) => {
            this.listeFrequence= param.filter(a => a).sort((a, b) => (a.valeur - b.valeur)); }
            );

  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  afficherModif(): boolean {

    this.collaborateurConnecte = JSON.parse(this._cookieService.get('col'));
    return (this.collaborateurConnecte.roles[0] === this.collaborateurConnecte.ADMIN);
  }
}


