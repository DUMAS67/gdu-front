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
    this.profil = this._cookieService.get('choixProfil') === null ? '0' : this._cookieService.get('choixProfil');
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
        // en cas de succès, redirection vers la page /connexion/profil
        col => this._router.navigate(['/gdu']),

        // en cas d'erreur, affichage d'un message d'erreur
        err => this.err = true
      );
    this.collaborateurConnexion = JSON.parse(this._cookieService.get('col'));
    //console.log(this._cookieService.get('col'));
    console.log('profil : '+ this.profil);
    console.log('collaborateurConnexion : '+this.collaborateurConnexion);
    console.log('collaborateurConnexion.roles : '+this.collaborateurConnexion.roles);
    this.statutConnexion = false;
    this.connexionBaseAdmin = this.collaborateur.estAdministrateur(this.collaborateurConnexion.roles);
    this.connexionBaseUser = this.collaborateur.estCollaborateur(this.collaborateurConnexion.roles);
    console.log('connexionBaseAdmin : ' + this.connexionBaseAdmin);
    console.log('connexionBaseUser : ' + this.connexionBaseUser);
  }


  seConnecter() {
    console.log(this.loginFormModalEmail.value);
    console.log(this.loginFormModalPassword.value);


  }

  seDeconnecter() {

    this._authSrv.seDeconnecter();
    this.statutConnexion = true;
    console.log('*Deconnexion&');
    this.collaborateurConnexion = null;
    console.log(this.collaborateurConnexion);
  }
}

