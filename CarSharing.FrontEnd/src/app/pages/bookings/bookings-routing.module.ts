import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingsComponent } from './bookings.component';
import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: 'bookings',
    component: MainLayoutComponent,
    children: [   
      { path: '', component: BookingsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingsRoutingModule { }
