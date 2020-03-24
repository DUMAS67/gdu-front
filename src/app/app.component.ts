import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})

export class AppComponent implements OnInit {

  constructor(private _router: Router, private routeActive: ActivatedRoute) { }

  ngOnInit(): void {
  }

  afficherMenu(): boolean {

    if ((this._router.url === '')) {
      return false;
    } else {
      return true;
    }
  }


}


