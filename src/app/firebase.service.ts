import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class FirebaseService {
  user: Observable<firebase.User>;
  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }
  login() {
    var provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider);
  }
  logOut() {
    this.afAuth.auth.signOut();
  }
  twitterLogin() {
   var provider = new firebase.auth.TwitterAuthProvider();
   firebase.auth().signInWithPopup(provider).then(function(result) {
   });
 }
}
