import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseService} from '../services/firebase.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector : 'TVSeriesPage',
  templateUrl : './TVSeriesPage.html',
  styleUrls: ['./TVSeriesPage.css'],
  providers: []
})
// tslint:disable-next-line:component-class-suffix
export class TVSeriesPage{
  constructor(
    public firebaseService: FirebaseService,
    private router: Router
  ){}
  items: Array<any>;
  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnInit(){
    this.firebaseService.getTVSeriesOnly().valueChanges().subscribe(data => {console.log(data); this.items = data; }) ;
  }
}
