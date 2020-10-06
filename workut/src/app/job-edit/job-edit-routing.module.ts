import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobEditPage } from './job-edit.page';

const routes: Routes = [
  {
    path: '',
    component: JobEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobEditPageRoutingModule {}
