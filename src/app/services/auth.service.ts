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

import { Platform, LoadingController } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { restoreView } from '@angular/core/src/render3';

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
    private platform: Platform,
    private loadingController: LoadingController,
    private fb: Facebook
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
  async facebookSignin() {

    if (this.platform.is('cordova')) {
      this.facebookNativeLogin();
    } else {
      this.facebookLogin();
    }
  }


  async nativeGoogleLogin() {
    try {
      console.log('gplusUser');

      const gplusUser = await this.gPlus.login({
        'webClientId': '228635509158-qq6qnaql0l5796uo0euhqs19u008r8p1.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      });
      const credential = await this.afAuth.auth.signInAndRetrieveDataWithCredential(
        auth.GoogleAuthProvider.credential(gplusUser.idToken)
      );

      this.updateUserData(credential.user);
      return this.navigateHome();
    } catch (err) {
      console.error('err ', err);
    }
  }

  navigateHome() {
  this.router.navigate(['/']);
}

  async webGoogleLogin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.updateUserData(credential.user);
    this.router.navigate(['/tabs/tab3']);
  }

  async facebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.updateUserData(credential.user);
   this.router.navigate(['/tabs/tab3']);
  }

  async facebookNativeLogin() {
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        this.fb.api('me/?fields=id,email,first_name,picture?type=large', ['public_profile', 'email'])
          .then(async apiRes => {
            const credential = await this.afAuth.auth.signInAndRetrieveDataWithCredential(auth.FacebookAuthProvider
              .credential(res.authResponse.accessToken));
            this.updateUserData(credential.user);
            this.router.navigate(['/tabs/tab3']);
          });
      })
      .catch(e => console.log('Error logging into Facebook', e));


    this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }


  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/tabs/tab3']);
  }

  updateUserData({ uid, email, displayName, photoURL, permiteNotificaciones = true }: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      email,
      displayName,
      photoURL,
      permiteNotificaciones
    };
    console.log('data ', data);
    console.log('userRef ', userRef);
    
    return userRef.set(data, { merge: true });
  }
}
