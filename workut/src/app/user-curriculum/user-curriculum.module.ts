import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserCurriculumPageRoutingModule } from './user-curriculum-routing.module';

import { UserCurriculumPage } from './user-curriculum.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserCurriculumPageRoutingModule
  ],
  declarations: [UserCurriculumPage]
})
export class UserCurriculumPageModule {}
