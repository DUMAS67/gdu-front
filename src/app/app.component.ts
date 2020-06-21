import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})

export class AppComponent implements OnInit {

  constructor(private _router: Router, private authService: AuthService, private routeActive: ActivatedRoute) { }

  ngOnInit(): void {
  }

  afficherMenu(): boolean {

    if ((this._router.url === '')) {
      return false;
    } else {
      return true;
    }
  }

  choixSortir() {

    // Dirige vers la page de connexion
    this._router.navigate(['/gdu']);



  }
}


