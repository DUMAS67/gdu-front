
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Collaborateur } from '../auth.domains';
import { DataService } from '../data.service';
import { LieuVm } from '../domains/LieuVm';
import { Observable } from 'rxjs';
import { UtVm } from '../domains/UtVm';
import { GraviteVm } from '../domains/Gravite';
import { FrequenceVm } from '../domains/FrequenceVm';
import { DuerFront } from '../domains/DuerFront';


@Component({
  selector: 'app-gdu-duer',
  templateUrl: './gdu-duer.component.html',
  styleUrls: []
})
export class GduDuerComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;

  elements: any = [];
  previous: any = [];
  headElements = ['ID', 'UT', 'Lieu', 'Activité', 'Danger', 'Risque',
    'G', 'F', 'C', 'Prévention', 'G', 'F', 'C', 'Prévention'];
  headElements1 = ['Plan Actions', 'Modification'];
  collaborateurConnexion: any;
  listeDuerFrontParCriticite$: Observable<DuerFront[]>;
  listeDuerFrontParCriticite: DuerFront[];
  listeDuerFrontParUt$: Observable<DuerFront[]>;
  listeDuerFrontParUt: DuerFront[];
  listeDuerFrontParLieu$: Observable<DuerFront[]>;
  listeDuerFrontParLieu: DuerFront[];


  constructor(private dataService: DataService, private _router: Router, private _cookieService: CookieService,
              private cdRef: ChangeDetectorRef, private _authSrv: AuthService) { }

  collaborateurConnecte: Collaborateur;
  listeLieu$ = this.dataService.afficherListeLieuDansDuer();
  listeLieu: LieuVm[];
  listeUt$ = this.dataService.afficherListeUtduDuer();
  listeUt: UtVm[];
  listeGravite$ = this.dataService.afficherListeGravite();
  listeGravite: GraviteVm[];
  listeFrequence$ = this.dataService.afficherListeFrequence();
  listeFrequence: FrequenceVm[];
  listeDuerFront$ = this.dataService.afficherListeDuerFront();
  listeDuerBack: DuerFront[];
  listeCriticite$ = this.dataService.afficherListeCriticite();
  listeCriticite: number[];
  p: number;
  a: string[] = ['a'];
  listeDuerFront: DuerFront[];
  maxVisibleItems = 10;

  ngOnInit() {

    this.listeDuerFront$.subscribe((param: DuerFront[]) => {

      this.elements = param.map(c => new DuerFront(
        c.id, c.ut, c.lieu, c.activite, c.danger, c.risque, c.gravite_Ex,
        c.frequence_Ex, c.prevExistante, c.gravite_Mo, c.frequence_Mo, c.prevMiseEnOeuvre, c.pas))
      .sort((a, b) => (a.ut.charCodeAt(0) - b.ut.charCodeAt(0)));
      console.log(this.elements.length);
      this.mdbTable.setDataSource(this.elements);
      console.log('1 '+this.elements.length);
      this.elements = this.mdbTable.getDataSource();
      console.log('2 '+this.elements.length);
      this.previous = this.mdbTable.getDataSource();
      console.log('3 '+this.elements.length);}
    );




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
    this.listeCriticite$.subscribe(( param: number[]) => {
           this.listeCriticite = param.filter(a => a).sort((a, b) => (a - b)); }
  );
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();


   /* console.log(this.mdbTablePagination.maxVisibleItems);
    console.log(this.mdbTablePagination.firstItemIndex);
    console.log(this.mdbTablePagination.lastItemIndex);
    console.log(this.cdRef.detectChanges());*/

  }

  afficherModif(): boolean {

    this.collaborateurConnecte = JSON.parse(this._cookieService.get('col'));
    return (this.collaborateurConnecte.roles[0] === this.collaborateurConnecte.ADMIN);
  }

  multi(a, b): number {
    return a * b;
  }

rafraichirSelection() {
  this.listeDuerFront$.subscribe((param: DuerFront[]) => {

    this.elements = param.map(c => new DuerFront(
      c.id, c.ut, c.lieu, c.activite, c.danger, c.risque, c.gravite_Ex,
      c.frequence_Ex, c.prevExistante, c.gravite_Mo, c.frequence_Mo, c.prevMiseEnOeuvre, c.pas))
    .sort((a, b) => (a.ut.charCodeAt(0) - b.ut.charCodeAt(0)));

    console.log(this.elements.length);

    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
  );

}

  afficheListeDuerParCriticite(crit: number)  {


    this.listeDuerFrontParCriticite$ = this.dataService.afficherListeDuerFrontParCriticite(crit);
    this.listeDuerFrontParCriticite$.subscribe((param: DuerFront[]) => {
      this.listeDuerFrontParCriticite = param.map(a => a).sort((a, b) => (a.ut.charCodeAt(0) - b.ut.charCodeAt(0)));
      this.mdbTable.setDataSource(this.listeDuerFrontParCriticite);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
      this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
      this.cdRef.detectChanges();
    });
  }
    afficheListeDuerParUt(ut: number)  {

      this.listeDuerFrontParUt$ = this.dataService.afficherListeDuerFrontParUt(ut);
      this.listeDuerFrontParUt$.subscribe((param: DuerFront[]) => {
        this.listeDuerFrontParUt = param.map(a => a).sort((a, b) => (a.lieu.charCodeAt(0) - b.lieu.charCodeAt(0)));
        this.mdbTable.setDataSource(this.listeDuerFrontParUt);
        console.log(this.listeDuerFrontParUt[0].id);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
        this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
        this.mdbTablePagination.calculateFirstItemIndex();
        this.mdbTablePagination.calculateLastItemIndex();
        this.cdRef.detectChanges();
      });
  }

  afficheListeDuerParLieu(lieu: number)  {

    this.listeDuerFrontParLieu$ = this.dataService.afficherListeDuerFrontParLieu(lieu);
    this.listeDuerFrontParLieu$.subscribe((param: DuerFront[]) => {
      this.listeDuerFrontParLieu = param.map(a => a).sort((a, b) => (a.ut.charCodeAt(0) - b.ut.charCodeAt(0)));
      this.mdbTable.setDataSource(this.listeDuerFrontParLieu);
      console.log(this.listeDuerFrontParLieu[0].id);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
      this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
      this.cdRef.detectChanges();
    });
}
affichePareto() {


  this.listeDuerFront$.subscribe((param: DuerFront[]) => {
    let sumCrit: number = param.map( a => { const criticite = a.gravite_Ex * a.frequence_Ex;
                                            a['criticite_Ex']= criticite;
                                            return criticite; })
  // crée un champ supplémentaire et temporaire de l'objet Duer de paramètre
  // but : ne pas refaire les calculs de criticité à cahque fois. Ce champ
  // reste sur l'objet seulement pour la fonction Pareto (mutation temporaire de l'objet)
    .reduce((a, b) => a + b);
    sumCrit = 0.8 * sumCrit;
    console.log('sumCrit : '+ sumCrit);
    let sommeCumul = 0;
    this.elements = param.sort((duer1, duer2) =>
    duer2['criticite_Ex'] - duer1['criticite_Ex'])
    .filter(duer => { sommeCumul += duer['criticite_Ex'];
                      console.log(duer['criticite_Ex']);
                      console.log('sommeCumul : ' + sommeCumul);
                      return sommeCumul <= sumCrit; } );
       });
  this.elements = this.mdbTable.getDataSource();
  this.previous = this.mdbTable.getDataSource();
  this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
  this.mdbTablePagination.calculateFirstItemIndex();
  this.mdbTablePagination.calculateLastItemIndex();
  this.cdRef.detectChanges();

  }



emitDataSourceChange() {
    this.mdbTable.dataSourceChange().subscribe((data: any) => {
      console.log(data);
    });
  }
}


