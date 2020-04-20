import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RisquesVm } from './domains/risquesVm';
import { HttpClient } from '@angular/common/http';
import { DangersVm } from './domains/dangersVM';
import { UtVm } from './domains/UtVm';

@Injectable({
  providedIn: 'root'
})



export class DataService {


  url_an = 'http://localhost:8080/';
  listeR: Observable<RisquesVm[]>;
  listeD: Observable<DangersVm[]>;
  listeUt: Observable<UtVm[]>;

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
}
