import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ClientDialogComponent } from './client-dialog/client-dialog.component';
import { WarningDialogModule } from '../warning-dialog/warning-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    ClientsRoutingModule,
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
  declarations: [ClientsComponent, ClientDialogComponent]
})
export class ClientsModule { }
