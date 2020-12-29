import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ForgotPassword',
  templateUrl: './ForgotPassword.html',
  styleUrls: ['./LogIn.css']
})
// tslint:disable-next-line:component-class-suffix
export class ForgotPassword implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }
}
