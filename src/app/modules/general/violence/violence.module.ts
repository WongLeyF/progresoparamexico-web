import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViolenceRoutingModule } from './violence-routing.module';
import { ViolenceComponent } from './violence.component';


@NgModule({
  declarations: [
    ViolenceComponent
  ],
  imports: [
    CommonModule,
    ViolenceRoutingModule
  ]
})
export class ViolenceModule { }
