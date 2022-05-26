import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralLayoutComponent } from './general-layout/general-layout.component';
import { NavbarGeneralComponent } from './navbar-general/navbar-general.component';
import { FooterGeneralComponent } from './footer-general/footer-general.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    GeneralLayoutComponent,
    NavbarGeneralComponent,
    FooterGeneralComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class SharedModule { }
