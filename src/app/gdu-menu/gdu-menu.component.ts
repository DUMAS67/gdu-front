import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-gdu-menu',
  templateUrl: './gdu-menu.component.html',
  styleUrls: []
})
export class GduMenuComponent implements OnInit {
  validatingForm: FormGroup;

  constructor(private _router : Router) { }

  ngOnInit() {
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
}

