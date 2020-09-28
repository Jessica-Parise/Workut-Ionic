import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RegisterCompanyComponent } from './register-company.component';

import { RegisterCompanyRoutingModule } from './register-company-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterCompanyRoutingModule
  ],
  declarations: [RegisterCompanyComponent]
})
export class RegisterCompanyModule { }