import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { ToastController } from '@ionic/angular';

import { Receta } from '../models/receta.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { variable } from '@angular/compiler/src/output/output_ast';


@Injectable({
  providedIn: 'root'
})
export class FavService {
  
  private itemDoc: AngularFirestoreDocument<any>;
  recetas: Receta[] = [];
  userId: string;
  favIds$: Observable<any>;
  
  constructor(private afs: AngularFirestore,
    public toastController: ToastController,
    private afAuth: AngularFireAuth) {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.getUserId();
        this.getFavIds();
        this.getFavRecetas();
      } else {
        this.userId = null;
      }
    });
  }

  private getUserId() {
    this.userId = this.afAuth.auth.currentUser.uid;
  }

  private getFavIds() {
    this.favIds$ = this.afs.collection('user_receta', ref => ref.where('uid', '==', this.userId)).valueChanges();
  }

  getFavRecetas() {

    this.favIds$.pipe(
      map(
        val => {
          for (let item of val) {
            //console.log(item);
            this.itemDoc = this.afs.doc<Receta>(`recetas/${item.recetaId}`);
            this.itemDoc.valueChanges().subscribe(
              data => {
                //console.log('data.recetaId: ' + data.id);
                console.log(JSON.stringify(data));
                console.log(!this.recetas.some(item => item.id === data.id));
                
                // items.some(item => item.a === '3')
                if (!this.recetas.some(item => item.id === data.id)) {
                  this.recetas.push(data);
                  console.log('añade receta');
                  
                } else {
                  console.log('already a fav');
                }
                console.log('this.recetas: ' + this.recetas.length);
              }
            );
          }
        })
    ).subscribe();
  }


  delete(id: string) {
    for (let i = 0; i < this.recetas.length; i++) {
      if (this.recetas[i].id === id) {
        this.recetas.splice(i, 1);
      }
    }
    let snapshot: any;
    snapshot = this.afs.collection('user_receta', ref => ref.where('uid', '==', this.userId).where('recetaId', '==', id)).snapshotChanges()
      .subscribe(
        arr => {
          let docId: string;
          // docId = '_'; // firebase error if string is not initialized but if initialized firestore can't store recipe a second time
          arr.map(snap => docId = snap.payload.doc.id);
          this.afs.collection('user_receta').doc(docId).delete();
        }
      );
    console.log(snapshot);

  }

  addFav(recetaId: string) {
        this.afs.collection('user_receta').doc(`${recetaId+this.userId}`).set({
          id: recetaId+this.userId,
          recetaId: recetaId,
          uid: this.userId
        });
        this.presentToast();
    
  }


  deleteFavs() {
    this.recetas = [];
  }



  
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Receta añadida a tus habituales!',
      duration: 2000,
      translucent: true,
      showCloseButton: true
    });
    toast.present();
  }

async presentAlreadyFavToast(){
  const toast = await this.toastController.create({
    message: 'Esta receta ya la tienes!',
    duration: 2000
  });
  toast.present();
}

}
