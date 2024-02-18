import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinesComponent } from './fines.component';
import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: 'fines',
    component: MainLayoutComponent,
    children: [   
      { path: '', component: FinesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinesRoutingModule { }
