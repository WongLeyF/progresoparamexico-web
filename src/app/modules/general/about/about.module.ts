import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import {MatTreeModule} from '@angular/material/tree';

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    MatTreeModule,
    AccordionModule.forRoot()
  ],
  entryComponents: [],
  bootstrap: [AboutComponent]
})
export class AboutModule { }
