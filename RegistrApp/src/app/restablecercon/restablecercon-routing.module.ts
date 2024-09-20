import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestablecerconPage } from './restablecercon.page';

const routes: Routes = [
  {
    path: '',
    component: RestablecerconPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestablecerconPageRoutingModule {}
