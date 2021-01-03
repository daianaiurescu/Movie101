import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import firebase from 'firebase/app';
import {async} from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {User} from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  userData: any;
  User: User;
  constructor(public  afAuth: AngularFireAuth, public  router: Router,  public ngZone: NgZone, private afs: AngularFirestore){
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }
  // tslint:disable-next-line:typedef
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result.user);
        this.ngZone.run(() => {
          if (result.user.email.endsWith('movie101.com')) {
             this.router.navigate(['/adminpage']);
          }
          else {
            this.router.navigate(['/home']);

          //  navigate to user page instead of home page
          }
        });
        this.updateUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }
  // tslint:disable-next-line:typedef
  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
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
  // tslint:disable-next-line:typedef
  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      Email: user.email,
      Role: {
        User: true
      }
    };
    return userRef.set(data, { merge: true });
  }
}
