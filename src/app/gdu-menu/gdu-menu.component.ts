import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Collaborateur } from '../auth.domains';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-gdu-menu',
  templateUrl: './gdu-menu.component.html',
  styleUrls: []
})
export class GduMenuComponent implements OnInit {
  validatingForm: FormGroup;

  collaborateurConnexion: Collaborateur;
  collaborateur: Collaborateur = new Collaborateur({});
  err: boolean;

  connexionBaseAdmin: boolean;
  connexionBaseUser: boolean;
  statutConnexion: boolean;
  profil: string;

  constructor(private _authSrv: AuthService, private _router: Router, private _cookieService: CookieService) { }

  ngOnInit() {
    this.connexionBaseAdmin = false;
    this.connexionBaseUser = false;
    this.statutConnexion = true;
    /*this.collaborateurConnexion = JSON.parse(this._cookieService.get('col'));
    if (this.collaborateurConnexion === null) {this.statutConnexion = true; }
    else {this.statutConnexion = false; }*/

    this.validatingForm = new FormGroup({
      loginFormModalEmail: new FormControl('', Validators.email),
      loginFormModalPassword: new FormControl('', Validators.required)
    });
  }
  get loginFormModalEmail() {
    return this.validatingForm.get('loginFormModalEmail');


  }
  get loginFormModalPassword() {
    return this.validatingForm.get('loginFormModalPassword');
  }

  afficherCotation() {

    this._router.navigate(['/gdu/cot']);
  }

  connecter() {

    console.log(this.loginFormModalEmail.value + '');

    this._authSrv.connecter(this.loginFormModalEmail.value + '', this.loginFormModalPassword.value + '')
      .subscribe(
        // en cas de succès, redirection vers la page /gdu
        col => {
        this.collaborateurConnexion = JSON.parse(this._cookieService.get('col'));
        this.statutConnexion = false;
        this.connexionBaseAdmin = this.collaborateur.estAdministrateur(this.collaborateurConnexion.roles);
        this.connexionBaseUser = this.collaborateur.estCollaborateur(this.collaborateurConnexion.roles);
        console.log('this.statutConnexion ' + this.statutConnexion);
          //console.log('profil : ' + this.profil);
        console.log('collaborateurConnexion : ' + this.collaborateurConnexion);
        console.log('collaborateurConnexion.roles : ' + this.collaborateurConnexion.roles);

        console.log('connexionBaseAdmin : ' + this.connexionBaseAdmin);
        console.log('connexionBaseUser : ' + this.connexionBaseUser);

        this._router.navigate(['/gdu']);

        },

        // en cas d'erreur, affichage d'un message d'erreur
        err => { this.err = true; }
      );



    console.log('this.statutConnexion ' + this.statutConnexion);
    //console.log('profil : ' + this.profil);
    console.log('collaborateurConnexion : ' + this.collaborateurConnexion);
    console.log('collaborateurConnexion.roles : ' + this.collaborateurConnexion.roles);

    console.log('connexionBaseAdmin : ' + this.connexionBaseAdmin);
    console.log('connexionBaseUser : ' + this.connexionBaseUser);
  }


  /*seConnecter() {
    console.log(this.loginFormModalEmail.value);
    console.log(this.loginFormModalPassword.value);


  }*/

  seDeconnecter() {
    console.log('111' + this.collaborateurConnexion.nom);
    this._authSrv.seDeconnecter();
    console.log('222' + this.collaborateurConnexion.nom);
    this.statutConnexion = true;
    console.log('*Deconnexion&');
    this.collaborateurConnexion = null;

  }
}

