import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterCompanyPageRoutingModule } from './register-company-routing.module';

import { RegisterCompanyPage } from './register-company.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterCompanyPageRoutingModule
  ],
  declarations: [RegisterCompanyPage]
})
export class RegisterCompanyPageModule {}
