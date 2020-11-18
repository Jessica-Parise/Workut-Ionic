import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrivePage } from './drive.page';

const routes: Routes = [
  {
    path: '',
    component: DrivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrivePageRoutingModule {}
