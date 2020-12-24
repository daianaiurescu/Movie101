import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePage} from './HomePage/HomePage';
import {TVSeriesPage} from './TVSeriesPage/TVSeriesPage';
import {MoviesPage} from './MoviesPage/MoviesPage';
import {LogIn} from './LogIn/LogIn';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomePage},
  {path: 'movies', component: MoviesPage},
  {path: 'tvseries', component: TVSeriesPage},
   {path: 'login', component: LogIn}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
