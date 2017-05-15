import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  providers: [FirebaseService, AngularFireAuth]
})
export class AuthenticationComponent implements OnInit {
  constructor(private firebaseService: FirebaseService, public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }
  user: Observable<firebase.User>;
  ngOnInit() {
  }
  logInGoogle(){
    this.firebaseService.login();
  }
  logInTwitter(){
    this.firebaseService.twitterLogin();
  }
  logOut(){
    this.firebaseService.logOut();
  }
}
