import { Component, OnInit } from '@angular/core';
import { FrequenceVm } from '../domains/FrequenceVm';
import { GraviteVm } from '../domains/Gravite';
import { DataService } from '../data.service';

@Component({
  selector: 'app-gdu-cot',
  templateUrl: './gdu-cot.component.html',
  styleUrls: []
})
export class GduCotComponent implements OnInit {
  criticite: number;

  constructor(private dataService: DataService) { }

  listeGravite$ = this.dataService.afficherListeGravite();
  listeGravite: GraviteVm[];
  listeFrequence$ = this.dataService.afficherListeFrequence();
  listeFrequence: FrequenceVm[];

  ngOnInit() { // Récupère les données criticités de gravité, fréquence de gdu-bd

    this.listeGravite$.subscribe((param: GraviteVm[]) => {
      this.listeGravite = param.sort((a, b) => (a.valeur - b.valeur));
    }
    );

    this.listeFrequence$.subscribe((param: FrequenceVm[]) => {
      this.listeFrequence = param.sort((a, b) => (a.valeur - b.valeur));
    }
    );

  }

// Calcule la criticité = frequence x gravité
// Valeur 1 = indice du tableau des gravité
// Valeur 2 = indice du tableau des fréquences
  crit(valeur1: number, valeur2: number): number {

    console.log('Valeur de la Gravité  :' + this.listeGravite[valeur1 - 1].valeur);
    console.log('Valeur de la Fréquence  :' + this.listeFrequence[valeur2 - 1].valeur);
    this.criticite = this.listeGravite[valeur1 - 1].valeur * this.listeFrequence[valeur2 - 1].valeur;
    console.log('valeurx = ' + this.criticite);
    return this.criticite;
  }

}
