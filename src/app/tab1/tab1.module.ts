import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { CategoriaComponent } from './categoria/categoria.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }, { path: ':id', component: CategoriaComponent }])
  ],
  declarations: [
    Tab1Page,
    CategoriaComponent],
  exports: [
    CategoriaComponent
  ]
})
export class Tab1PageModule { }
