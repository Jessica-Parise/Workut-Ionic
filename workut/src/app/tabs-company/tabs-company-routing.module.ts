import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsCompanyPage } from './tabs-company.page';

const routes: Routes = [
  {
    path: '',
    component: TabsCompanyPage,
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      {
        path: 'jobs-management',
        loadChildren: () => import('./jobs-management/jobs-management.module').then( m => m.JobsManagementPageModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
      }
      
    ]
  },  {
    path: 'job-create',
    loadChildren: () => import('./job-create/job-create.module').then( m => m.JobCreatePageModule)
  },
  {
    path: 'job-edit',
    loadChildren: () => import('./job-edit/job-edit.module').then( m => m.JobEditPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsCompanyPageRoutingModule {}
