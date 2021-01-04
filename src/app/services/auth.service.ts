import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import firebase from 'firebase/app';
import {async} from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService{
  constructor(public  afAuth: AngularFireAuth, public  router: Router,  public ngZone: NgZone, public firestore: AngularFirestore){
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }
  user: any;
  message: string;
  // tslint:disable-next-line:typedef
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['userPage']);
        });
      }).catch((error) => {
        window.alert(error.message);
      });
  }
  // tslint:disable-next-line:typedef
  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = this.firestore.collection('users');
        this.message = 'Your account has been created!';
        return user.doc(result.user.uid).set({
            Email: result.user.email,
            Role: 'User'
        });
      }).catch((error) => {
        window.alert(error.message);
      });
  }
  // tslint:disable-next-line:typedef
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }
  // tslint:disable-next-line:typedef
  loginWithGoogle() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  // tslint:disable-next-line:typedef
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider).then((result) => {
      console.log('You have been successfully logged in!');
    }).catch((error) => {
      console.log(error);
    });
  }
  // tslint:disable-next-line:typedef
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['LogIn']);
    });
  }
}
