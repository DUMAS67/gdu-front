import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RisquesVm } from './domains/RisquesVm';
import { HttpClient } from '@angular/common/http';
import { DangersVm } from './domains/DangersVm';
import { UtVm } from './domains/UtVm';
import { LieuVm } from './domains/LieuVm';
import { CriticiteVm } from './domains/CriticiteVm';
import { GraviteVm } from './domains/Gravite';
import { FrequenceVm } from './domains/FrequenceVm';

@Injectable({
  providedIn: 'root'
})



export class DataService {


  url_an = 'http://localhost:8080/';
  listeR: Observable<RisquesVm[]>;
  listeD: Observable<DangersVm[]>;
  listeUt: Observable<UtVm[]>;
  listeLieu: Observable<LieuVm[]>;
  listeCriticite: Observable<CriticiteVm[]>;
  listeGravite: Observable<GraviteVm[]>;
  listeFrequence: Observable<FrequenceVm[]>;

  constructor(private http: HttpClient) { }


  afficherListeRisque(): Observable<RisquesVm[]> {
    this.listeR = this.http.get<RisquesVm[]>(this.url_an + 'risques');
    this.listeR.forEach(element => {
      console.log(element[0].nom);
    });
    return this.listeR;

  }

  afficherListeDangers(): Observable<DangersVm[]> {
    this.listeD = this.http.get<DangersVm[]>(this.url_an + 'dangers');
    /*this.listeR.forEach(element => {
      console.log(element[0].nom);
    });*/
    return this.listeD;

  }

  afficherListeUt(): Observable<UtVm[]> {
    this.listeUt = this.http.get<UtVm[]>(this.url_an + 'ut');
    /*this.listeR.forEach(element => {
      console.log(element[0].nom);
    });*/
    return this.listeUt;

  }

  afficherListeLieu(): Observable<LieuVm[]> {
    this.listeLieu = this.http.get<LieuVm[]>(this.url_an + 'lieu');
    /*this.listeR.forEach(element => {
      console.log(element[0].nom);
    });*/
    return this.listeLieu;

  }

  afficherListeCriticite(): Observable<CriticiteVm[]> {
    this.listeCriticite = this.http.get<CriticiteVm[]>(this.url_an + 'criticite');
    /*this.listeR.forEach(element => {
      console.log(element[0].nom);
    });*/
    return this.listeCriticite;

  }

  afficherListeGravite(): Observable<GraviteVm[]> {
    this.listeGravite = this.http.get<GraviteVm[]>(this.url_an + 'gravite');
    /*this.listeR.forEach(element => {
      console.log(element[0].nom);
    });*/
    return this.listeGravite;

  }

  afficherListeFrequence(): Observable<FrequenceVm[]> {
    this.listeFrequence = this.http.get<FrequenceVm[]>(this.url_an + 'frequence');
    /*this.listeR.forEach(element => {
      console.log(element[0].nom);
    });*/
    return this.listeFrequence;

  }
}
