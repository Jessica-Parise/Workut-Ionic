import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'jobs-list',
    pathMatch: 'full'
  },
  {
    path: 'job-create',
    loadChildren: () => import('./job-create/job-create.module').then(m => m.JobCreatePageModule)
  },
  {
    path: 'job-edit',
    loadChildren: () => import('./job-edit/job-edit.module').then(m => m.JobEditPageModule)
  },
  {
    path: 'jobs-list',
    loadChildren: () => import('./jobs-list/jobs-list.module').then(m => m.JobsListPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
