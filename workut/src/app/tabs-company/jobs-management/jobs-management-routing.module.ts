import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobsManagementPage } from './jobs-management.page';

const routes: Routes = [
  {
    path: '',
    component: JobsManagementPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsManagementPageRoutingModule {}
