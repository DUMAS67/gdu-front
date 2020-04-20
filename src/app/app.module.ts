import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GduMenuComponent } from './gdu-menu/gdu-menu.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { GduEvrpComponent } from './gdu-evrp/gdu-evrp.component';
import { GduDuerComponent } from './gdu-duer/gdu-duer.component';
import { GduPasComponent } from './gdu-pas/gdu-pas.component';
import { GduConnexionComponent } from './gdu-connexion/gdu-connexion.component';
import { GduPanneauComponent } from './gdu-panneau/gdu-panneau.component';
import { GduDeconnexionComponent } from './gdu-deconnexion/gdu-deconnexion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GduPrevComponent } from './gdu-prev/gdu-prev.component';
import { GduCotComponent } from './gdu-cot/gdu-cot.component';
import { GduDuerRegComponent } from './gdu-duer-reg/gdu-duer-reg.component';
import { GduDefComponent } from './gdu-def/gdu-def.component';
import { GduPrevRegComponent } from './gdu-prev-reg/gdu-prev-reg.component';
import { GduPchRegComponent } from './gdu-pch-reg/gdu-pch-reg.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor.service';
import { CookieService } from 'ngx-cookie-service';



const ROUTES: Routes = [
  { path: 'gdu', component: GduPanneauComponent },

  { path: 'gdu/deconnexion', component: GduDeconnexionComponent },
  { path: 'gdu/evrp', component: GduEvrpComponent },
  { path: 'gdu/duer', component: GduDuerComponent },
  { path: 'gdu/pas', component: GduPasComponent },
  { path: 'gdu/prev', component: GduPrevComponent },
  { path: 'gdu/cot', component: GduCotComponent },
  { path: 'gdu/duer-reg', component: GduDuerRegComponent },
  { path: 'gdu/prev-reg', component: GduPrevRegComponent },
  { path: 'gdu/pch-reg', component: GduPchRegComponent },
  { path: 'gdu/def', component: GduDefComponent },
  { path: '', redirectTo: '/gdu', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    GduMenuComponent,
    GduEvrpComponent,
    GduDuerComponent,
    GduPasComponent,
    GduConnexionComponent,
    GduPanneauComponent,
    GduDeconnexionComponent,
    GduPrevComponent,
    GduCotComponent,
    GduDuerRegComponent,
    GduDefComponent,
    GduPrevRegComponent,
    GduPchRegComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],

  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  },
    CookieService],
  bootstrap: [AppComponent],

})
export class AppModule { }
