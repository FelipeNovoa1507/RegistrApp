import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistenciaQrPage } from './asistencia-qr.page';

const routes: Routes = [
  {
    path: '',
    component: AsistenciaQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistenciaQrPageRoutingModule {}
