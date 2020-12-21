import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseService} from './../services/firebase.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector : 'HomePage',
  templateUrl : './HomePage.html',
  styleUrls: ['./HomePage.css'],
  providers: []
})

// tslint:disable-next-line:component-class-suffix
export class HomePage implements OnInit{
  constructor(
    public firebaseService: FirebaseService,
    private router: Router
  ){}
  items: Array<any>;
  latest: Array<any>;
  top5: Array<any>;
  public routerLinkVariable = '/movies';
  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.firebaseService.getProducts().valueChanges().subscribe(data => {console.log(data); this.items = data; }) ;
    this.firebaseService.getLatest().valueChanges().subscribe(data1 => {console.log(data1); this.latest = data1; });
    this.firebaseService.getTop5().valueChanges().subscribe(data2 => {console.log(data2); this.top5 = data2; });
  }
  // tslint:disable-next-line:typedef
  getLatestMovie(){
    this.latest = this.items.sort((a: any, b: any) => b.Title - a.Title);
  }
}

