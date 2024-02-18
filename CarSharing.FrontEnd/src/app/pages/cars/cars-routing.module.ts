import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsComponent } from './cars.component';
import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: 'cars',
    component: MainLayoutComponent,
    children: [   
      { path: '', component: CarsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule { }
