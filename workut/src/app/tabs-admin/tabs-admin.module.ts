import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsAdminPageRoutingModule } from './tabs-admin-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { TabsAdminPage } from './tabs-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsAdminPageRoutingModule, 
    HttpClientModule
  ],
  declarations: [TabsAdminPage]
})
export class TabsAdminPageModule {}
