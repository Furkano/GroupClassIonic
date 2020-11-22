import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home/:id',
    component: HomePage,
    children:[
      {
        path:'flow/:id',
        loadChildren:()=>import('../pages/flow/flow.module').then(m=>m.FlowPageModule)
      },
      {
        path:'members/:id',
        loadChildren:()=>import('../pages/members/members.module').then(m=>m.MembersPageModule)
      },
      {
        path:'about/:id',
        loadChildren:()=>import('../pages/about/about.module').then(m=>m.AboutPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
