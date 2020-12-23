
import {Injectable} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { observable} from 'rxjs';
import {query} from '@angular/animations';

@Injectable({providedIn: 'root'})
  class FirebaseService {
  // tslint:disable-next-line:typedef
  constructor(public afs: AngularFirestore) {
  }

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
}

export {FirebaseService};
