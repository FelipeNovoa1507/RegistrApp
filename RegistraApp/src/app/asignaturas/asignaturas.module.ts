import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterBySeccionPipe } from '../pipes/filter-by-seccion.pipe';
import { FilterByIdProfePipe } from '../pipes/filter-by-idProfe.pipe';
import { IonicModule } from '@ionic/angular';

import { AsignaturasPageRoutingModule } from './asignaturas-routing.module';

import { AsignaturasPage } from './asignaturas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignaturasPageRoutingModule,
],
  declarations: [AsignaturasPage, FilterBySeccionPipe, FilterByIdProfePipe]
})
export class AsignaturasPageModule {}
