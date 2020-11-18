import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrivePageRoutingModule } from './drive-routing.module';

import { DrivePage } from './drive.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrivePageRoutingModule
  ],
  declarations: [DrivePage]
})
export class DrivePageModule {}
