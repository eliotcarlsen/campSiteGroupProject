import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from './firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FirebaseService]
})
export class AppComponent {
  title = 'Camp Finder!';
  private isLoggedIn: boolean;
  private userName: string;
  private userEmail: string;
  private uid: string;
  private userPic: string;

  constructor(private router: Router, private firebaseService: FirebaseService) {
    this.firebaseService.user.subscribe((auth) => {
      if (auth == null) {
        this.isLoggedIn = false;
        this.router.navigate(['']);
      } else {
        this.isLoggedIn = true;
        this.userName = auth.displayName;
        this.userEmail = auth.email;
        this.uid = auth.uid;
        this.userPic = auth.photoURL;
        this.router.navigate(['results', this.uid]);
      }
    });

  }
}
