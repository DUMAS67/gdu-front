
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Collaborateur } from '../auth.domains';
import { GraviteVm } from '../domains/Gravite';
import { FrequenceVm } from '../domains/FrequenceVm';
import { UtVm } from '../domains/UtVm';
import { LieuVm } from '../domains/LieuVm';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { DuerFront } from '../domains/DuerFront';
import { PasVm } from '../domains/PasVm';


@Component({
  selector: 'app-gdu-prev',
  templateUrl: './gdu-prev.component.html',
  styleUrls: ['./gdu-prev.component.css']
})
export class GduPrevComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;

  elements1: any = [];
  previous: any = [];
  headElements1 = ['ID', 'UT', 'Lieu', 'Activité', 'Danger', 'Risque',
    'G', 'F', 'C', 'Prévention à mettre en place'];
  headElements2 = ['Plan Actions', 'Modification'];
  collaborateurConnecte: Collaborateur;
  listeLieu$ = this.dataService.afficherListeLieuDansDuer();
  listeLieu: LieuVm[];
  listeUt$ = this.dataService.afficherListeUtduDuer();
  listeUt: UtVm[];
  listeGravite$ = this.dataService.afficherListeGravite();
  listeGravite: GraviteVm[];
  listeFrequence$ = this.dataService.afficherListeFrequence();
  listeFrequence: FrequenceVm[];
  listeCriticite$ = this.dataService.afficherListeCriticiteMo();
  listeCriticite: number[];
  listeDuerFront$ = this.dataService.afficherListeDuerFront();
  maxVisibleItems = 10;
  listeDuerFrontParUt$: any;
  listeDuerFrontParUt: DuerFront[];
  listeDuerFrontParLieu$: any;
  listeDuerFrontParLieu: DuerFront[];
  listeDuerFrontParCriticite$: any;
  listeDuerFrontParCriticite: DuerFront[];
  listeDuerFrontParCriticiteMo: DuerFront[];
  criticite: number;

  constructor(private dataService: DataService, private _router: Router, private _cookieService: CookieService,
    private cdRef: ChangeDetectorRef, private _authSrv: AuthService) { }


  ngOnInit() {

    this.listeDuerFront$.subscribe((param: DuerFront[]) => {

      this.elements1 = param.map(c => new DuerFront(
        c.id, c.ut, c.lieu, c.activite, c.danger, c.risque, c.gravite_Ex,
        c.frequence_Ex, c.prevExistante, c.gravite_Mo, c.frequence_Mo, c.prevMiseEnOeuvre, c.pas))
        .sort((a, b) => (a.ut.charCodeAt(0) - b.ut.charCodeAt(0)));
      this.mdbTable.setDataSource(this.elements1);
      this.elements1 = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    }
    );
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();

    this.listeLieu$.subscribe((param: LieuVm[]) => {
      this.listeLieu = param.filter(a => a).sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0)));
    }
    );
    this.listeUt$.subscribe((param: UtVm[]) => {
      this.listeUt = param.filter(a => a).sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0)));
    }
    );
    this.listeCriticite$.subscribe((param: number[]) => {
      this.listeCriticite = param.filter(a => a).sort((a, b) => (a - b));
    }
    );

    this.listeGravite$.subscribe((param: GraviteVm[]) => {
      this.listeGravite = param.filter(a => a).sort((a, b) => (a.valeur - b.valeur));
    }
    );
    this.listeFrequence$.subscribe((param: FrequenceVm[]) => {
      this.listeFrequence = param.filter(a => a).sort((a, b) => (a.valeur - b.valeur));
    }
    );
  }
  multi(a, b): number {
    return a * b;
  }


  afficherModif(): boolean {

    this.collaborateurConnecte = JSON.parse(this._cookieService.get('col'));
    return (this.collaborateurConnecte.roles[0] === this.collaborateurConnecte.ADMIN);
  }

  rafraichirSelection() {
    this.listeDuerFront$.subscribe((param: DuerFront[]) => {

      this.elements1 = param.map(c => new DuerFront(
        c.id, c.ut, c.lieu, c.activite, c.danger, c.risque, c.gravite_Ex,
        c.frequence_Ex, c.prevExistante, c.gravite_Mo, c.frequence_Mo, c.prevMiseEnOeuvre, c.pas))
        .sort((a, b) => (a.ut.charCodeAt(0) - b.ut.charCodeAt(0)));
      this.mdbTable.setDataSource(this.elements1);
      this.elements1 = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
      this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
      this.cdRef.detectChanges();
    }
    );

  }
  affichePareto() {


    this.listeDuerFront$.subscribe((param: DuerFront[]) => {
      let sumCrit: number = param.map(a => {
        const criticite = a.gravite_Mo * a.frequence_Mo;
        a['criticite_Mo'] = criticite;
        return criticite;
      })
        // crée un champ supplémentaire et temporaire de l'objet Duer de paramètre
        // but : ne pas refaire les calculs de criticité à cahque fois. Ce champ
        // reste sur l'objet seulement pour la fonction Pareto (mutation temporaire de l'objet)
        .reduce((a, b) => a + b);
      sumCrit = 0.8 * sumCrit;
      console.log('sumCrit : ' + sumCrit);
      let sommeCumul = 0;
      this.elements1 = param.sort((duer1, duer2) =>
        duer2['criticite_Mo'] - duer1['criticite_Mo'])
        .filter(duer => {
          sommeCumul += duer['criticite_Mo'];
          console.log(duer['criticite_Mo']);
          console.log('sommeCumul : ' + sommeCumul);
          return sommeCumul <= sumCrit;
        });
    });
    this.elements1 = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();

  }

  afficheListeDuerParUt(ut: number) {

    this.listeDuerFrontParUt$ = this.dataService.afficherListeDuerFrontParUt(ut);
    this.listeDuerFrontParUt$.subscribe((param: DuerFront[]) => {
      this.listeDuerFrontParUt = param.map(a => a).sort((a, b) => (a.lieu.charCodeAt(0) - b.lieu.charCodeAt(0)));
      this.mdbTable.setDataSource(this.listeDuerFrontParUt);
      this.elements1 = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
      this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
      this.cdRef.detectChanges();
    });
  }
  afficheListeDuerParCriticiteMo(crit: number) {


    this.listeDuerFrontParCriticite$ = this.dataService.afficherListeDuerFrontParCriticiteMo(crit);
    this.listeDuerFrontParCriticite$.subscribe((param: DuerFront[]) => {
      this.listeDuerFrontParCriticiteMo = param.map(a => a).sort((a, b) => (a.ut.charCodeAt(0) - b.ut.charCodeAt(0)));
      this.mdbTable.setDataSource(this.listeDuerFrontParCriticiteMo);
      this.elements1 = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
      this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
      this.cdRef.detectChanges();
    });
  }
  afficheListeDuerParLieu(lieu: number) {

    this.listeDuerFrontParLieu$ = this.dataService.afficherListeDuerFrontParLieu(lieu);
    this.listeDuerFrontParLieu$.subscribe((param: DuerFront[]) => {
      this.listeDuerFrontParLieu = param.map(a => a).sort((a, b) => (a.ut.charCodeAt(0) - b.ut.charCodeAt(0)));
      this.mdbTable.setDataSource(this.listeDuerFrontParLieu);
      console.log(this.listeDuerFrontParLieu[0].id);
      this.elements1 = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
      this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
      this.cdRef.detectChanges();
    });
  }

  creerPas1(
    idDuer: number,
    action: string,
    budget: number,
    qui: string,
    delai: string,
  ) {

    console.log('idDuer : ' + idDuer);
    console.log('action :' + action);
    console.log('budget :' + budget);
    console.log('qui : ' + qui);
    console.log('delai : ' + delai);


    this.dataService.creerPas(new PasVm(null, idDuer,
      action,
      budget,
      qui, new Date(delai), false));

  }
  critValeur(valeur1: number, valeur2: number): number {
    return valeur1 * valeur2;
  }

  critIndice(valeur1: number, valeur2: number): number {

    console.log('Valeur de la Gravité  :' + this.listeGravite[valeur1 - 1].valeur);
    console.log('Valeur de la Fréquence  :' + this.listeFrequence[valeur2 - 1].valeur);
    this.criticite = this.listeGravite[valeur1 - 1].valeur * this.listeFrequence[valeur2 - 1].valeur;
    console.log('valeurx = ' + this.criticite);
    return this.criticite;
  }

  modifierDuer1(id: number, gr: number, fr: number, prev: string, grMo: number, frMo: number, prevMo: string) {

    this.dataService.modifDuer(id, gr, fr, prev, grMo, frMo, prevMo);
  }

  modifierDuerPrev1(id: number, grMo: number, frMo: number, prevMo: string) {

    this.dataService.modifDuerPrev(id, grMo, frMo, prevMo);
  }

  detruireEvrp1(id: number) {
    console.log('id a détrure : ' + id);
    this.dataService.detruireEvrp(id);
  }
}


