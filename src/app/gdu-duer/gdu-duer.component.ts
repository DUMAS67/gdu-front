
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent, TableModule } from 'angular-bootstrap-md';
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
import { PasVm } from '../domains/PasVm';
import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-gdu-duer',
  templateUrl: './gdu-duer.component.html',
  styleUrls: []
})
export class GduDuerComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;

  content: ElementRef;

  elements: any = [];
  previous: any = [];
  headElements = ['ID', 'UT', 'Lieu', 'Activité', 'Danger', 'Risque',
    'G', 'F', 'C', 'Prévention', 'G', 'F', 'C', 'Prévention'];
  headElementsPDF = ['ID', 'UT', 'Lieu', 'Activité', 'Danger', 'Risque',
    'G', 'F', 'C', 'Prévention Existante', 'G', 'F', 'C', 'Prévention à Maître en Oeuvre'];
  headElements1 = ['Plan Actions', 'Modification'];
  collaborateurConnexion: any;
  listeDuerFrontParCriticite$: Observable<DuerFront[]>;
  listeDuerFrontParCriticite: DuerFront[];
  listeDuerFrontParUt$: Observable<DuerFront[]>;
  listeDuerFrontParUt: DuerFront[];
  listeDuerFrontParLieu$: Observable<DuerFront[]>;
  listeDuerFrontParLieu: DuerFront[];
  criticite: number;
  entetePdf = '';
  date: Date;
  page: number;
  nbPage: number;
  listePareto: DuerFront[];




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
  listePareto$ = this.dataService.afficherListeDuerPareto();
  p: number;
  a: string[] = ['a'];
  listeDuerFront: DuerFront[];
  maxVisibleItems = 10;

  ngOnInit() {
/* Initialisation des listes de données pour le module :
Duer pour présentation
Lieu pour sélection
Unité pour sélection
Gravité, Fréquence,
Criticité pour sélection
*/

    // Abonnement subject
    this.dataService.subjectActDuerFront.subscribe((param: DuerFront[]) => {

      this.elements = param.map(c => new DuerFront(
        c.id, c.ut, c.lieu, c.activite, c.danger, c.risque, c.gravite_Ex,
        c.frequence_Ex, c.prevExistante, c.gravite_Mo, c.frequence_Mo, c.prevMiseEnOeuvre, c.pas))
        .sort((a, b) => (a.ut.charCodeAt(0) - b.ut.charCodeAt(0)));
      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();

    }
    );

    this.listeLieu$.subscribe((param: LieuVm[]) => {
      this.listeLieu = param.sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0)));
    }
    );

    this.listeUt$.subscribe((param: UtVm[]) => {
      this.listeUt = param.sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0)));
    }
    );

    this.listeGravite$.subscribe((param: GraviteVm[]) => {
      this.listeGravite = param.sort((a, b) => (a.valeur - b.valeur));
    }
    );
    this.listeFrequence$.subscribe((param: FrequenceVm[]) => {
      this.listeFrequence = param.sort((a, b) => (a.valeur - b.valeur));
    }
    );
    this.listeCriticite$.subscribe((param: number[]) => {
      this.listeCriticite = param.sort((a, b) => (a - b));
    }
    );

    this.dataService.afficherListeDuerFront(); //initialisation subject

  }

  ngAfterViewInit() { // Pagination du tableau de présentation
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
/* fonction qui n'affiche que les bouttons de
modifications dans le cas d'un administrateur */
  afficherModif(): boolean {

    this.collaborateurConnecte = JSON.parse(this._cookieService.get('col'));
    return (this.collaborateurConnecte.roles[0] === this.collaborateurConnecte.ADMIN);
  }

  multi(a, b): number {
    return a * b;
  }

  /* Raffraichit les données des listes
  Unité de travail
  Lieu
  Criticité */
  rafraichirSelection() {

    this.dataService.afficherListeDuerFront();

    this.listeUt$.subscribe((param: UtVm[]) => {
      this.listeUt = param.sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0)));
    }
    );

    this.listeLieu$.subscribe((param: LieuVm[]) => {
      this.listeLieu = param.sort((a, b) => (a.nom.charCodeAt(0) - b.nom.charCodeAt(0)));
    }
    );
    this.listeCriticite$.subscribe((param: number[]) => {
      this.listeCriticite = param.sort((a, b) => (a - b));
    }
    );
  }
/* Affiche le Duer sélectionné par une valeur de criticité */
// crit = valeur de critère de sélection
  afficheListeDuerParCriticite(crit: number) {


    this.listeDuerFrontParCriticite$ = this.dataService.afficherListeDuerFrontParCriticite(crit);
    this.listeDuerFrontParCriticite$.subscribe((param: DuerFront[]) => {
      this.listeDuerFrontParCriticite = param.sort((a, b) => (a.ut.charCodeAt(0) - b.ut.charCodeAt(0)));
      this.mdbTable.setDataSource(this.listeDuerFrontParCriticite);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
      this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
      this.cdRef.detectChanges();
      this.entetePdf = ' par Criticité :  ' + crit;
    });
  }
  /* Affiche le Duer sélectionné par une valeur d'Unité de Travail */
  // ut = valeur ut de sélection
  afficheListeDuerParUt(ut: number) {

    this.listeDuerFrontParUt$ = this.dataService.afficherListeDuerFrontParUt(ut);
    this.listeDuerFrontParUt$.subscribe((param: DuerFront[]) => {
      this.listeDuerFrontParUt = param.sort((a, b) => (a.lieu.charCodeAt(0) - b.lieu.charCodeAt(0)));
      this.mdbTable.setDataSource(this.listeDuerFrontParUt);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
      this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
      this.cdRef.detectChanges();
      this.entetePdf = ' par Unité de Travail :  ' + this.listeDuerFrontParUt[0].ut;
    });
  }
/* Affiche le Duer sélectionné par une valeur de Lieu*/
// lieu = valeur de lieu de sélection
  afficheListeDuerParLieu(lieu: number) {

    this.listeDuerFrontParLieu$ = this.dataService.afficherListeDuerFrontParLieu(lieu);
    this.listeDuerFrontParLieu$.subscribe((param: DuerFront[]) => {
      this.listeDuerFrontParLieu = param.sort((a, b) => (a.ut.charCodeAt(0) - b.ut.charCodeAt(0)));
      this.mdbTable.setDataSource(this.listeDuerFrontParLieu);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
      this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
      this.cdRef.detectChanges();
      this.entetePdf = ' par Lieu :  ' + this.listeDuerFrontParLieu[0].lieu;
    });
  }

  /* Affiche le Duer sélectionné par un Pareto */
  affichePareto() {

    this.dataService.afficherListeDuerFront();
    this.listePareto$.subscribe((param: DuerFront[]) => {
      this.entetePdf = ' par Pareto';
      let sumCrit: number = param.map(a => {
        const criticite = a.gravite_Ex * a.frequence_Ex;
        a['criticite_Ex'] = criticite;
        return criticite;
      })
        // crée un champ supplémentaire et temporaire de l'objet Duer de paramètre
        // but : ne pas refaire les calculs de criticité à cahque fois. Ce champ
        // reste sur l'objet seulement pour la fonction Pareto (mutation temporaire de l'objet)
        .reduce((a, b) => a + b);
      sumCrit = 0.8 * sumCrit;

      let sommeCumul = 0;
      this.elements = param.sort((duer1, duer2) =>
        duer2['criticite_Ex'] - duer1['criticite_Ex'])
        .filter(duer => {
          sommeCumul += duer['criticite_Ex'];

          return sommeCumul <= sumCrit;
        });
    });
    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.entetePdf = ' par Pareto :  ';
    this.cdRef.detectChanges();
  }

  critValeur(valeur1: number, valeur2: number): number {
    return valeur1 * valeur2;
  }
// Calcule la valeur de criticite
// valeur1 = rang de la liste de sélection de Gravité
// valeur2 = rang de la liste de sélection des Fréquences
  critIndice(valeur1: number, valeur2: number): number {

    this.criticite = this.listeGravite[valeur1 - 1].valeur * this.listeFrequence[valeur2 - 1].valeur;
    return this.criticite;
  }

  // Modifie le contenu des Evrp
  // id = numéro d'id du Duer à modifier
  // gr = valeur de gravité à modifer dans l'Evrp pour la prévention existante
  // fr = valeur de fréquence à modifier dans l'Evrp
  // prev = nouvelle prévention pour l'EVrp
  // gro = valeur de gravité à modifer dans l'Evrp pour la prévention à mettre en oeuvre
  // fr = valeur de fréquence à modifier dans l'Evrp pour la prévention à mettre en oeuvre
   // prevMo = nouvelle prévention à mettre en oeuvre pour l'EVrp
  modifierDuer1(id: number, gr: number, fr: number, prev: string, grMo: number, frMo: number, prevMo: string) {

    this.dataService.modifDuer(id, gr, fr, prev, grMo, frMo, prevMo);
  }
// Détruit une ligne d'Evrp
// id = numéro d'identification de l'Evrp dans le DUER
// idPas = numéro d'identification du Plan d'Acrion Spécifique pour l' id de l'Evrp dans le DUER
  detruireEvrp1(id: number, idPas: number) {
    if (idPas != null) { this.dataService.detruireEvrp(id, idPas);
                          } else
    { this.dataService.detruireEvrp(id, -1);
      }

  }
// Imprime le haut et bas de Page du Duer
// entete = valeur définissant le type de Duer à afficher selon les sélections
  impression(entete: string) {

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
// Imprime le contenu du Duer
// index = indice du tableau de données
// doc1 = fichier PDF qui reçoit les données
// pas = saut de ligne
  imprimerLigne(index: number, doc1: jsPDF, pas: number) {
    doc1.text(this.elements[index].id.toString(), 10, 30 + (10 * (pas % 17)));
    doc1.text(this.elements[index].ut, 15, 30 + (10 * (pas % 17)));
    doc1.text(this.elements[index].lieu.substring(0, 22), 35, 30 + (10 * (pas % 17)));
    doc1.text(this.elements[index].activite, 60, 30 + (10 * (pas % 17)));
    doc1.text(this.elements[index].danger, 85, 30 + (10 * (pas % 17)));
    doc1.text(this.elements[index].risque.substring(0, 29), 110, 30 + (10 * (pas % 17)));
    doc1.text(this.elements[index].gravite_Ex.toString(), 140, 30 + (10 * (pas % 17)));
    doc1.text(this.elements[index].frequence_Ex.toString(), 145, 30 + (10 * (pas % 17)));
    doc1.text((this.elements[index].frequence_Ex * this.elements[index].gravite_Ex).toString(), 150, 30 + (10 * (pas % 17)));

    doc1.text(this.elements[index].gravite_Mo.toString(), 216, 30 + (10 * (pas % 17)));
    doc1.text(this.elements[index].frequence_Mo.toString(), 221, 30 + (10 * (pas % 17)));
    doc1.text((this.elements[index].frequence_Mo * this.elements[index].gravite_Mo).toString(), 226, 30 + (10 * (pas % 17)));

    if ((this.elements[index].prevExistante.length < 46)
      && (this.elements[index].prevMiseEnOeuvre.length < 46)) {
      doc1.text(this.elements[index].prevExistante.substring(0, 46), 155, 30 + (10 * (pas % 17)));
      doc1.text(this.elements[index].prevMiseEnOeuvre.substring(0, 46), 231, 30 + (10 * (pas % 17)));
    }

    if ((this.elements[index].prevExistante.length > 46)
      || (this.elements[index].prevMiseEnOeuvre.length > 46)) {
      doc1.text(this.elements[index].prevExistante.substring(0, 46), 155, 30 + (10 * (pas % 17)));
      doc1.text(this.elements[index].prevMiseEnOeuvre.substring(0, 46), 231, 30 + (10 * (pas % 17)));

      doc1.text(this.elements[index].prevExistante.substring(46, 92), 155, 30 + (10 * (pas % 17)) + 2);
      doc1.text(this.elements[index].prevMiseEnOeuvre.substring(46, 92), 231, 30 + (10 * (pas % 17)) + 2);

      if ((this.elements[index].prevExistante.length > 92) || (this.elements[index].prevMiseEnOeuvre.length > 92)) {
        doc1.text(this.elements[index].prevExistante.substring(92, 146), 155, 30 + (10 * (pas % 17)) + 4);
        doc1.text(this.elements[index].prevMiseEnOeuvre.substring(92, 146), 231, 30 + (10 * (pas % 17)) + 4);
      }
    }

  }

  // Imprime les titres du tableau du Duer
  // doc2 = fichier PDF qui reçoit les données
  imprimerLigneEntete(doc2: jsPDF) {
    doc2.text(this.headElementsPDF[0], 10, 20);
    doc2.text(this.headElementsPDF[1], 15, 20);
    doc2.text(this.headElementsPDF[2], 35, 20);
    doc2.text(this.headElementsPDF[3], 60, 20);
    doc2.text(this.headElementsPDF[4], 85, 20);
    doc2.text(this.headElementsPDF[5], 110, 20);
    doc2.text(this.headElementsPDF[6], 140, 20);
    doc2.text(this.headElementsPDF[7], 145, 20);
    doc2.text(this.headElementsPDF[8], 150, 20);
    doc2.text(this.headElementsPDF[9], 155, 20);
    doc2.text(this.headElementsPDF[10], 216, 20);
    doc2.text(this.headElementsPDF[11], 221, 20);
    doc2.text(this.headElementsPDF[12], 226, 20);
    doc2.text(this.headElementsPDF[13], 231, 20);

  };

  // Crée un Plan d'action Spécifique
  creerPas1(
    idDuer: number,
    action: string,
    budget: number,
    qui: string,
    delai: string,
  ) {




    this.dataService.creerPas(new PasVm(null, idDuer,
      action,
      budget,
      qui, new Date(delai), false));

  }

  consolider(donnee: string): string
  {

    return donnee + '';
  }

}


