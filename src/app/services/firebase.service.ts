
import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { observable} from 'rxjs';
import {query} from '@angular/animations';
import {AngularFireList} from '@angular/fire/database';
import {Movie} from '../Movie';

@Injectable({providedIn: 'root'})
  class FirebaseService {
  // tslint:disable-next-line:typedef
  constructor(public afs: AngularFirestore) {
  }
imagedetails: AngularFireList<any>;
  movieDoc: AngularFirestoreDocument<Movie>;
  // tslint:disable-next-line:typedef
  getProducts() {
    return this.afs.collection('/products');
  }

  // tslint:disable-next-line:typedef
  getLatest() {
    return this.afs.collection('/products', ref => ref.orderBy('Year').limitToLast(1));
  }

  // tslint:disable-next-line:typedef
  getTop5() {
    return this.afs.collection('/products', ref => ref.orderBy('Rating').limitToLast(3));
  }
  // tslint:disable-next-line:typedef
  getMoviesOnly(){
    return this.afs.collection('/products', ref => ref.where('Type', '==', 'Movie'));
  }
  // tslint:disable-next-line:typedef
  getTVSeriesOnly(){
    return this.afs.collection('/products', ref => ref.where('Type', '==', 'TVSeries'));
  }
  // tslint:disable-next-line:typedef
  createMovie(Title, Description, Type, Year, Rating, Image, Trailer){
    return this.afs.collection('/products').add({
      // tslint:disable-next-line:typedef
      Title, Description, Type, Year, Rating, Image, Trailer
    });
  }
  // tslint:disable-next-line:typedef
  deleteItem(movie: Movie){
     this.movieDoc = this.afs.doc(`/products/${movie.uid}`);
     this.movieDoc.delete();
  }
  // tslint:disable-next-line:typedef
  updateItem(movie: Movie){
    this.movieDoc = this.afs.doc(`/products/${movie.uid}`);
    console.log(movie);
    this.movieDoc.update(movie);
  }
}

export {FirebaseService};
