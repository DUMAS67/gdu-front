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
import { GduPrevComponent } from './gdu-prev/gdu-prev.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { GduDeconnexionComponent } from './gdu-deconnexion/gdu-deconnexion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const ROUTES: Routes = [
  { path: 'gdu', component: GduPanneauComponent },
  { path: 'gdu/connexion', component: GduConnexionComponent },
  { path: 'gdu/deconnexion', component: GduDeconnexionComponent },
  { path: 'gdu/evrp', component: GduEvrpComponent },
  { path: 'gdu/duer', component: GduDuerComponent },
  {path: 'gdu/prev', component: GduPrevComponent},
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
    GduPrevComponent,
    GduDeconnexionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    MDBBootstrapModule.forRoot(),
    NgbModule,
    FormsModule,
    ReactiveFormsModule
      ],

  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
