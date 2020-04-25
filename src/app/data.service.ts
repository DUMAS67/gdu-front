import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RisquesVm } from './domains/RisquesVm';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DangersVm } from './domains/DangersVm';
import { UtVm } from './domains/UtVm';
import { LieuVm } from './domains/LieuVm';
import { CriticiteVm } from './domains/CriticiteVm';
import { GraviteVm } from './domains/Gravite';
import { FrequenceVm } from './domains/FrequenceVm';
import { ActivitesVm } from './domains/ActivitesVm';
import { Ut } from './environments/Ut';

@Injectable({
  providedIn: 'root'
})



export class DataService {

  url_gdu = 'http://localhost:8080/';
  listeR: Observable<RisquesVm[]>;
  listeD: Observable<DangersVm[]>;
  listeUt: Observable<UtVm[]>;
  listeLieu: Observable<LieuVm[]>;
  listeCriticite: Observable<CriticiteVm[]>;
  listeGravite: Observable<GraviteVm[]>;
  listeFrequence: Observable<FrequenceVm[]>;
  listeActivite: Observable<ActivitesVm[]>;
  ut: Observable<UtVm>;
  constructor(private http: HttpClient) { }


  afficherListeRisque(): Observable<RisquesVm[]> {
    this.listeR = this.http.get<RisquesVm[]>(this.url_gdu + 'risques');

    return this.listeR;

  }

  afficherListeDanger(): Observable<DangersVm[]> {
    this.listeD = this.http.get<DangersVm[]>(this.url_gdu + 'dangers');

    return this.listeD;

  }

  afficherListeUt(): Observable<UtVm[]> {
    this.listeUt = this.http.get<UtVm[]>(this.url_gdu + 'uts');

    return this.listeUt;

  }

  afficherListeLieu(): Observable<LieuVm[]> {
    this.listeLieu = this.http.get<LieuVm[]>(this.url_gdu + 'lieus');

    return this.listeLieu;

  }

  afficherListeCriticite(): Observable<CriticiteVm[]> {
    this.listeCriticite = this.http.get<CriticiteVm[]>(this.url_gdu + 'criticites');

    return this.listeCriticite;

  }

  afficherListeGravite(): Observable<GraviteVm[]> {
    this.listeGravite = this.http.get<GraviteVm[]>(this.url_gdu + 'gravites');

    return this.listeGravite;

  }

  afficherListeFrequence(): Observable<FrequenceVm[]> {
    this.listeFrequence = this.http.get<FrequenceVm[]>(this.url_gdu + 'frequences');
    return this.listeFrequence;

  }

  afficherListeActivite(): Observable<ActivitesVm[]> {
    this.listeActivite = this.http.get<ActivitesVm[]>(this.url_gdu + 'activites');

    return this.listeActivite;

  }


  creerUt(newUt: string): string {
    const urlPostUt = this.url_gdu + 'ut?nom=' + newUt;

    this.http.post(urlPostUt, {}).
      subscribe(
        (data: any) => {
          console.log(data);
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }

  modifUt(idav: number, nomap: string): string {

    const urlPostUt = this.url_gdu + 'utm?id=' + idav + '&nomap=' + nomap;

    this.http.post(urlPostUt, {}).
      subscribe(
        (data: any) => {
          console.log(data);
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }

  creerLieu(newLieu: string): string {
    const urlPostLieu = this.url_gdu + 'lieu?nom=' + newLieu;
    console.log(urlPostLieu);
    console.log(newLieu);
    this.http.post(urlPostLieu, {}).
      subscribe(
        (data: any) => {
          console.log(data);
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }

  modifLieu(idav: number, nomap: string): string {

    const urlPostLieu = this.url_gdu + 'lieum?id=' + idav + '&nomap=' + nomap;

    this.http.post(urlPostLieu, {}).
      subscribe(
        (data: any) => {
          console.log(data);
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }

  creerActivite(newActivite: string): string {
    const urlPostActivite = this.url_gdu + 'activite?nom=' + newActivite;


    this.http.post(urlPostActivite, {}).
      subscribe(
        (data: any) => {
          console.log(data);
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }

  modifActivite(idav: number, nomap: string): string {

    const urlPostActivite = this.url_gdu + 'activitem?id=' + idav + '&nomap=' + nomap;

    this.http.post(urlPostActivite, {}).
      subscribe(
        (data: any) => {
          console.log(data);
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }


  creerDanger(nouveauNomDanger: string): string {
    const urlPostDg = this.url_gdu + 'danger?nom=' + nouveauNomDanger;


    this.http.post(urlPostDg, {}).
      subscribe(
        (data: any) => {
          console.log(data);
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }

  modifDanger(idav: number, nomap: string): string {

    const urlPostDg = this.url_gdu + 'dangerm?id=' + idav + '&nomap=' + nomap;

    this.http.post(urlPostDg, {}).
      subscribe(
        (data: any) => {
          console.log(data);
          return data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          return error;
        });
    return '';
  }

}
