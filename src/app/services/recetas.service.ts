import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';

import { Receta } from '../models/receta.model';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {
  private itemDoc: AngularFirestoreDocument<Receta>;
  receta$: Observable<Receta>;
  recetas$: Observable<Receta[]>;

  constructor(private afs: AngularFirestore) {
  }


  getRecetasByCategoria(categoria: string) {
    this.recetas$ = this.afs.collection<Receta>('recetas', ref => ref.where('category', '==', categoria)).valueChanges();
    return this.recetas$;
  }

  getRecetaById(id: string) {
    this.itemDoc = this.afs.doc<Receta>(`recetas/${id}`);
    this.receta$ = this.itemDoc.valueChanges();

    return this.receta$;
  }

}
