import {Component} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {User} from '../user';
import {AuthService} from '../services/auth.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {finalize, map, take, tap} from 'rxjs/operators';
import {FirebaseService} from '../services/firebase.service';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'AdminPage',
  templateUrl: './AdminPage.html',
  styleUrls: ['./AdminPage.css']
})
// tslint:disable-next-line:component-class-suffix
export class AdminPage{
  constructor(private auth: AuthService, private firebaseService: FirebaseService, private storage: AngularFireStorage) {}
  Title: string;
  Description: string;
  Type: string;
  Year: string;
  Rating: string;
  Image: string;
  Trailer: string;
  items: Array<any>;
  message: any;
  impath: string;
  trpath: string;
  selectedImage: string;
  selectedTrailer: string;
  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnInit(){
    this.firebaseService.getProducts().valueChanges().subscribe(data => this.items = data);
  }
  // tslint:disable-next-line:typedef
  createRecord(){
    // tslint:disable-next-line:prefer-const
    let filePath = `/files/${this.Image}_${new Date().getTime()}`;
    const trailerPath = `/files/${this.Trailer}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    const trailerRef = this.storage.ref(trailerPath);
    this.storage.upload(trailerPath, this.selectedTrailer).snapshotChanges().pipe(
      finalize(() => {
        trailerRef.getDownloadURL().subscribe((url) => {
          this.Trailer = url;
          console.log(this.Trailer);
        });
      })
    ).subscribe();
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.Image = url;
          console.log(this.Image);
          console.log(this.selectedImage);
          this.firebaseService.createMovie(this.Title, this.Description, this.Type, this.Year, this.Rating, this.Image, this.Trailer)
            .then(res => this.message = 'Record added to database');
        });
      })
    ).subscribe();
  }
  // tslint:disable-next-line:typedef
  upload($event){
    this.selectedImage = $event.target.files[0];
  }
  // tslint:disable-next-line:typedef
  upload2($event){
    this.selectedTrailer = $event.target.files[1];
  }
}
