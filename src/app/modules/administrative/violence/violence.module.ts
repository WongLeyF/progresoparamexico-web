import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViolenceRoutingModule } from './violence-routing.module';
import { ViolenceComponent } from './violence.component';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [
    ViolenceComponent
  ],
  imports: [
    CommonModule,
    ViolenceRoutingModule,
    MatTabsModule
  ]
})
export class ViolenceModule { }
