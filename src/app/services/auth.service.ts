import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';

import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private gPlus: GooglePlus,
    private platform: Platform
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignin() {

    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
  }
  async nativeGoogleLogin() {
    try {
      const gplusUser = await this.gPlus.login({
        'webClientId': '228635509158-qq6qnaql0l5796uo0euhqs19u008r8p1.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      });
      const credential = await this.afAuth.auth.signInAndRetrieveDataWithCredential(
        auth.GoogleAuthProvider.credential(gplusUser.idToken)
      );
      this.updateUserData(credential.user);
      return this.router.navigate(['/']);
    } catch (err) {
      alert(err);
    }
  }

  async webGoogleLogin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.updateUserData(credential.user);
    this.router.navigate(['/']);
  }

  async facebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.updateUserData(credential.user);
    return this.router.navigate(['/']);
  }

  async signOut() {
    await this.afAuth.auth.signOut().then();
    this.router.navigate(['/tabs/tab3']);
  }

  private updateUserData({ uid, email, displayName, photoURL, permiteNotificaciones = true }: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      email,
      displayName,
      photoURL,
      permiteNotificaciones
    };

    return userRef.set(data, { merge: true });
  }
}
