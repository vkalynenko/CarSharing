import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: 'clients',
    component: MainLayoutComponent,
    children: [   
      { path: '', component: ClientsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
