import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePage} from './HomePage/HomePage';
import {TVSeriesPage} from './TVSeriesPage/TVSeriesPage';
import {MoviesPage} from './MoviesPage/MoviesPage';

const routes: Routes = [
  {path: 'home', component: HomePage},
  {path: 'movies', component: MoviesPage},
  {path: 'TVseries', component: TVSeriesPage}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
