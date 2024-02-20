import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from '@angular/flex-layout';
import { CarsRoutingModule } from './cars-routing.module';
import { CarsComponent } from './cars.component';
import {MatTableModule} from '@angular/material/table'
import { CarDialogComponent } from './car-dialog/car-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { WarningDialogModule } from '../warning-dialog/warning-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    CarsRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatCheckboxModule,
    WarningDialogModule
  ],
  declarations: [CarsComponent, CarDialogComponent]
})
export class CarsModule { }
