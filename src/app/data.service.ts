import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RisquesVm } from './domains/risquesVm';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})



export class DataService {


  url_an = 'http://localhost:8080/risques';
  listeR: Observable<RisquesVm[]>;

  constructor(private http: HttpClient) { }


  afficherListeRisque(): Observable<RisquesVm[]> {
    this.listeR = this.http.get<RisquesVm[]>(this.url_an);
    this.listeR.forEach(element => {
      console.log(element[0].nom);
    });
    return this.listeR;

  }
}
