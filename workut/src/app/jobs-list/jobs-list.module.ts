import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobsListPageRoutingModule } from './jobs-list-routing.module';

import { JobsListPage } from './jobs-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobsListPageRoutingModule
  ],
  declarations: [JobsListPage]
})
export class JobsListPageModule {}
