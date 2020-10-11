import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsUserPageRoutingModule } from './tabs-user-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { TabsUserPage } from './tabs-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsUserPageRoutingModule, 
    HttpClientModule
  ],
  declarations: [TabsUserPage]
})
export class TabsUserPageModule {}
