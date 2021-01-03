import {Component} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FirebaseService} from '../services/firebase.service';

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
  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnInit(){
    this.firebaseService.getProducts().valueChanges().subscribe(data => this.items = data);
  }
  // tslint:disable-next-line:typedef
  deleteMovie(id){
    this.firebaseService.deleteItem(id);
  }
}
