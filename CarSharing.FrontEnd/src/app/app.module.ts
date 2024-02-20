import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from './layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CarsModule } from './pages/cars/cars.module';
import { FinesModule } from './pages/fines/fines.module';
import { ClientsModule } from './pages/clients/clients.module';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { BookingsModule } from './pages/bookings/bookings.module';
import { HomeModule } from './home/home.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/bookings',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes),
    LayoutModule,
    HomeModule,
    CarsModule,
    FinesModule,
    ClientsModule,
    BookingsModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
