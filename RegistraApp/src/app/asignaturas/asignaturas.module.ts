import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FilterByIdProfePipe } from '../pipes/filter-by-idProfe.pipe';
import { FilterBySeccionPipe } from '../pipes/filter-by-seccion.pipe';
import { AsignaturasPageRoutingModule } from './asignaturas-routing.module';

import { AsignaturasPage } from './asignaturas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignaturasPageRoutingModule,
],
  declarations: [AsignaturasPage,FilterByIdProfePipe,FilterBySeccionPipe]
})
export class AsignaturasPageModule {}
