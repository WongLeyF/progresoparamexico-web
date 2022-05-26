import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddInstituteComponent } from './modals/add-institute/add-institute.component';
import { MatNativeDateModule } from '@angular/material/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddCareerComponent } from './modals/add-career/add-career.component';


@NgModule({
  declarations: [
    SettingsComponent,
    AddInstituteComponent,
    AddCareerComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    FontAwesomeModule
  ]
})
export class SettingsModule { }
