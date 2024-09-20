import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroAsistenciaPage } from './registro-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroAsistenciaPageRoutingModule {}
