import {Component} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {User} from '../user';
import {AuthService} from '../services/auth.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {map, take, tap} from 'rxjs/operators';
import {FirebaseService} from '../services/firebase.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'AdminPage',
  templateUrl: './AdminPage.html',
  styleUrls: ['./AdminPage.css']
})
// tslint:disable-next-line:component-class-suffix
export class AdminPage{
  constructor(private auth: AuthService, private firebaseService: FirebaseService) {}
  Title: string;
  Description: string;
  Type: string;
  Year: string;
  Rating: string;
  Image: string;
  Trailer: string;
  items: Array<any>;
  message: any;
  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnInit(){
    this.firebaseService.getProducts().valueChanges().subscribe(data => this.items = data);
  }
  // tslint:disable-next-line:typedef
  createRecord(){
    this.firebaseService.createMovie(this.Title, this.Description, this.Type, this.Year, this.Rating, this.Image, this.Trailer)
      .then(res => this.message = 'Record added to database');
  }
  // tslint:disable-next-line:typedef
  deleteMovie(id){
    this.firebaseService.deleteItem(id);
  }
}
