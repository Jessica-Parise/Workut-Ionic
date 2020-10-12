import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobEditPageRoutingModule } from './job-edit-routing.module';

import { JobEditPage } from './job-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobEditPageRoutingModule
  ],
  declarations: [JobEditPage]
})
export class JobEditPageModule {}
