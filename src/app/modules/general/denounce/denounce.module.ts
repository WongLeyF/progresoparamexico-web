import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DenounceRoutingModule } from './denounce-routing.module';
import { DenounceComponent } from './denounce.component';


@NgModule({
  declarations: [
    DenounceComponent
  ],
  imports: [
    CommonModule,
    DenounceRoutingModule
  ]
})
export class DenounceModule { }
