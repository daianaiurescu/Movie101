import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import auth from 'firebase';
import firebase from 'firebase/app';
import {async} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  constructor(public  afAuth: AngularFireAuth, public  router: Router){
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }
  user: any;
  // tslint:disable-next-line:typedef
  async register(email: string, password: string) {
    const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
    this.sendEmailVerification();
  }
  // tslint:disable-next-line:typedef
  async sendEmailVerification() {
    await firebase.auth().currentUser.sendEmailVerification();
    this.router.navigate(['verifyemail']);
  }
  // tslint:disable-next-line:typedef
  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }
  // tslint:disable-next-line:typedef
  async logout(){
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
  // tslint:disable-next-line:typedef
  async  loginWithGoogle(){
      return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
    }
  // tslint:disable-next-line:typedef
    AuthLogin(provider){
    return this.afAuth.signInWithPopup(provider).then((result) => {
      console.log('You have been successfully logged in!');
    }).catch((error) => {
      console.log(error);
    });
    }
}
