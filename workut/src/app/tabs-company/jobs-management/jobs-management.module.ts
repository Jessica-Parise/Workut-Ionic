import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobsManagementPageRoutingModule } from './jobs-management-routing.module';

import { JobsManagementPage } from './jobs-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobsManagementPageRoutingModule
  ],
  declarations: [JobsManagementPage]
})
export class JobsManagementPageModule {}
