import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';

import { Receta } from '../models/receta.model';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {
  recetas$: Observable<Receta[]>;

  constructor(private afs: AngularFirestore) {
  }


  getRecetasByCategoria(categoria: string) {
    this.recetas$ = this.afs.collection<Receta>('recetas', ref => ref.where('category', '==', categoria)).valueChanges();
    return this.recetas$;
  }

}
