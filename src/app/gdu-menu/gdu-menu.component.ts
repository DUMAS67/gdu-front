import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';



@Component({
  selector: 'app-gdu-menu',
  templateUrl: './gdu-menu.component.html',
  styleUrls: []
})
export class GduMenuComponent implements OnInit {
  validatingForm: FormGroup;

  constructor() { }

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
}

