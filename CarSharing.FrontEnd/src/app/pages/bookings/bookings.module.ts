import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from '@angular/flex-layout';
import { BookingsComponent } from './bookings.component';
import { BookingsRoutingModule } from './bookings-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { BookingDialogComponent } from './booking-dialog/booking-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WarningDialogModule } from '../warning-dialog/warning-dialog.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    BookingsRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    WarningDialogModule
  ],
  providers: [provideNativeDateAdapter()],
  declarations: [BookingsComponent, BookingDialogComponent]
})
export class BookingsModule { }
