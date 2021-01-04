import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireAuthModule} from '@angular/fire/auth';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import {HomePage} from './HomePage/HomePage';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MoviesPage} from './MoviesPage/MoviesPage';
import {TVSeriesPage} from './TVSeriesPage/TVSeriesPage';
import {LogIn} from './LogIn/LogIn';
import {register} from './LogIn/register';
import {ForgotPassword} from './LogIn/ForgotPassword';
import {AdminPage} from './AdminPage/AdminPage';
import {UpdateDelete} from './AdminPage/UpdateDelete';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    MoviesPage,
    TVSeriesPage,
    LogIn,
    register,
    ForgotPassword,
    AdminPage,
    UpdateDelete
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        FormsModule,
        AngularFireAuthModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
