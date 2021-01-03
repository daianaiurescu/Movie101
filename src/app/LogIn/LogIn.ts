import {Component, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
import {User} from '../user';
import {Router} from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'LogIn',
  templateUrl: './LogIn.html',
  styleUrls: ['./LogIn.css']
})
// tslint:disable-next-line:component-class-suffix
export  class  LogIn  implements  OnInit {
  User: User;
  constructor(public  authService: AuthService, public router: Router) { }
  // tslint:disable-next-line:typedef
  ngOnInit() {}
}

