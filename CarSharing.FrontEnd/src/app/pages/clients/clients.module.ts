import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';

@NgModule({
  imports: [
    CommonModule,
    ClientsRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  declarations: [ClientsComponent]
})
export class ClientsModule { }
