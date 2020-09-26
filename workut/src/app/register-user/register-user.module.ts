import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RegisterUserComponent } from './register-user.component';

import { RegisterUserRoutingModule } from './register-user-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterUserRoutingModule
  ],
  declarations: [RegisterUserComponent]
})
export class RegisterUserModule { }
