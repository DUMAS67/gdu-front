import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Collaborateur } from '../auth.domains';
import { CookieService } from 'ngx-cookie-service';
import { CreationVm } from '../domains/CreationVm';
import { DataService } from '../data.service';

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
  dateDuer: Date;
  connexionBaseAdmin: boolean; // teste si on est connecté en tant qu'administrateur
  connexionBaseUser: boolean; // teste si on est connecté en tant qu'utilisateur
  statutConnexion: boolean; // teste si on est connecté à la base gdu-db
  profil: string;
  listeCrea$ = this.dataService.afficherListeCrea();
  listeCrea: CreationVm[];


  constructor(private _authSrv: AuthService, private dataService: DataService,
              private _router: Router, private _cookieService: CookieService) { }

  ngOnInit() {
    // Initialise les états de connexions
    this.connexionBaseAdmin = false;
    this.connexionBaseUser = false;
    this.statutConnexion = true;
    // Initialise les varibles de form du questionnaire de connexion
    this.validatingForm = new FormGroup({
      loginFormModalEmail: new FormControl('', Validators.email),
      loginFormModalPassword: new FormControl('', Validators.required)
    });
  }

  // récupère le contenu de l'email de connexion
  get loginFormModalEmail() {
    return this.validatingForm.get('loginFormModalEmail');
  }

  // récupère le contenu du password
  get loginFormModalPassword() {
    return this.validatingForm.get('loginFormModalPassword');
  }

// affiche le panneau sur les valeurs de fréquence, gravité définie en  gdu-db

  afficherCotation() {

    this._router.navigate(['/gdu/cot']);
  }

  // appelle la fonction de connexion à la base de données en fonction des identifiants
  connecter() {

       this._authSrv.connecter(this.loginFormModalEmail.value + '', this.loginFormModalPassword.value + '')
      .subscribe(
        // en cas de succès, redirection vers la page /gdu
        col => {
        this.collaborateurConnexion = JSON.parse(this._cookieService.get('col'));
        this.statutConnexion = false;
        this.connexionBaseAdmin = this.collaborateur.estAdministrateur(this.collaborateurConnexion.roles);
        this.connexionBaseUser = this.collaborateur.estCollaborateur(this.collaborateurConnexion.roles);

        // appelle la liste de création des DUER
        this.listeCrea$.subscribe((param: CreationVm[]) => {
          this.listeCrea = param.map(a => a);
        }
        );
        // modifie les dates de création du Duer
        this.dateDuer = new Date();
        this.dataService.modifDateDuer1(this.dateDuer.toLocaleString());
        this._router.navigate(['/gdu']);
        },
        // en cas d'erreur, affichage d'un message d'erreur
        err => { this.err = true;
                 this.loginFormModalEmail.setValue('');
                 this.loginFormModalPassword.setValue('');
          }
      );

  }

  // Deconnecte à la Base de donnée gdu-db avant toute connection, efface les cookies
deconectCol() {
  this._authSrv.seDeconnecter();
  this.collaborateurConnexion = null;
}

// Se déconnecte de la base de donnée et initialise tous les états de connexion
  seDeconnecter() {

    this._authSrv.seDeconnecter();
    this.statutConnexion = true;
    this.collaborateurConnexion = null;
    this._router.navigate(['/gdu/deconnexion']);
    this.connexionBaseAdmin = false;
    this.connexionBaseUser = false;
    this.loginFormModalEmail.setValue('');
    this.loginFormModalPassword.setValue('');
    this.err = false;
  }
  //raffraichie la valeur Err, et les champs de saisie de la connexion
  modifErr() {
    this.loginFormModalEmail.setValue('');
    this.loginFormModalPassword.setValue('');
    this.err = false;
  }
}

