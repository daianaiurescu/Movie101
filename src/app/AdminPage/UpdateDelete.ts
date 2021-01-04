import {Component} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FirebaseService} from '../services/firebase.service';
import {Movie} from '../Movie';
import {map} from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'UpdateDelete',
  templateUrl: './UpdateDelete.html',
  styleUrls: ['./AdminPage.css']
})
// tslint:disable-next-line:component-class-suffix
export class UpdateDelete{
  constructor(private auth: AuthService, private firebaseService: FirebaseService) {}
  items: Array<any>;
  editState = false;
  itemToEdit: Movie;
  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnInit(){
    this.firebaseService.getProducts().snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Movie;
        const uid = a.payload.doc.id;
        return {uid, ...data};
      }))).subscribe(data => {this.items = data; console.log(this.items); });
  }
  // tslint:disable-next-line:typedef
  deleteMovie(event, movie: Movie){
    console.log(movie.uid);
    console.log(movie.Title);
    this.firebaseService.deleteItem(movie);
  }
  // tslint:disable-next-line:typedef
  editItem(event, movie: Movie){
    this.editState = true;
    this.itemToEdit = movie;
  }
  // tslint:disable-next-line:typedef
  updateItem(movie: Movie){
    this.firebaseService.updateItem(movie);
  }
}
