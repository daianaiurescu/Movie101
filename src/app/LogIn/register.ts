import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'register',
  templateUrl: './Register.html',
  styleUrls: ['./LogIn.css']
})
// tslint:disable-next-line:class-name component-class-suffix
export class register implements OnInit {
  constructor(
    public authService: AuthService
  ) { }
  // tslint:disable-next-line:typedef
  ngOnInit() { }
}
