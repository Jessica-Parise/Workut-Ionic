import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobCreatePageRoutingModule } from './job-create-routing.module';

import { JobCreatePage } from './job-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    JobCreatePageRoutingModule
  ],
  declarations: [JobCreatePage]
})
export class JobCreatePageModule {}
