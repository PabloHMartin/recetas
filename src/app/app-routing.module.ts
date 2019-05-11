import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'receta', loadChildren: './pages/receta/receta.module#RecetaPageModule' },
  { path: 'info/privacidad', loadChildren: './pages/privacidad/privacidad.module#PrivacidadPageModule' },
  { path: 'info/licencias', loadChildren: './pages/licencias/licencias.module#LicenciasPageModule' },
  { path: 'info/desarrollador', loadChildren: './pages/desarrollador/desarrollador.module#DesarrolladorPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
