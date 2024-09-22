import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule),
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule),
  },
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule),
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./ayuda/ayuda.module').then( m => m.AyudaPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'restablecercon',
    loadChildren: () => import('./restablecercon/restablecercon.module').then( m => m.RestablecerconPageModule)
  },
  {
    path: 'asignaturas',
    loadChildren: () => import('./asignaturas/asignaturas.module').then( m => m.AsignaturasPageModule),
  },
  {
    path: 'asistencias',
    loadChildren: () => import('./asistencias/asistencias.module').then( m => m.AsistenciasPageModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}