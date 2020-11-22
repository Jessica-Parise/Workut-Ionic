import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobDetailsPage } from './job-details.page';

const routes: Routes = [
  {
    path: '',
    component: JobDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobDetailsPageRoutingModule {}
