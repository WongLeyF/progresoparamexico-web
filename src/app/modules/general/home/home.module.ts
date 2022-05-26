import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AlertModule } from 'ngx-bootstrap/alert';
@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatSidenavModule,
    CarouselModule.forRoot(),
    AlertModule.forRoot()
  ],
  entryComponents: [],
  bootstrap: [HomeComponent]

})
export class HomeModule { }
