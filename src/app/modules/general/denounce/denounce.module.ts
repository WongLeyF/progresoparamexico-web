import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DenounceRoutingModule } from './denounce-routing.module';
import { DenounceComponent } from './denounce.component';


@NgModule({
  declarations: [
    DenounceComponent
  ],
  imports: [
    CommonModule,
    DenounceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DenounceModule { }
