import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobDetailsPageRoutingModule } from './job-details-routing.module';

import { JobDetailsPage } from './job-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobDetailsPageRoutingModule
  ],
  declarations: [JobDetailsPage]
})
export class JobDetailsPageModule {}
