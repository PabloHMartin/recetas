import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DesarrolladorPage } from './desarrollador.page';

const routes: Routes = [
  {
    path: '',
    component: DesarrolladorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DesarrolladorPage]
})
export class DesarrolladorPageModule {}
