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

const ROUTES: Routes = [
  { path: 'gdu', component: GduPanneauComponent },
  { path: 'gdu/connexion', component: GduConnexionComponent },
  { path: 'gdu/deconnexion', component: GduDeconnexionComponent },
  { path: 'gdu/evrp', component: GduEvrpComponent },
  { path: 'gdu/duer', component: GduDuerComponent },
  { path: 'gdu/pas', component: GduPasComponent },
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
    GduDeconnexionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    MDBBootstrapModule.forRoot(),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
