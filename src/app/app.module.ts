import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import {HomePage} from './HomePage/HomePage';
import {FormsModule} from '@angular/forms';
import {MoviesPage} from './MoviesPage/MoviesPage';
import {TVSeriesPage} from './TVSeriesPage/TVSeriesPage';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    MoviesPage,
    TVSeriesPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
