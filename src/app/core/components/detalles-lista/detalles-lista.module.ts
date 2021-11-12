import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetallesListaRoutingModule } from './detalles-lista-routing.module';
import { DetallesListaComponent } from './detalles-lista.component';


@NgModule({
  declarations: [
    DetallesListaComponent
  ],
  imports: [
    CommonModule,
    DetallesListaRoutingModule
  ]
})
export class DetallesListaModule { }
