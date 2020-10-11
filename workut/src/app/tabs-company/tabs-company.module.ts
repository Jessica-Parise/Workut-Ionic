import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsCompanyPageRoutingModule } from './tabs-company-routing.module';

import { TabsCompanyPage } from './tabs-company.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsCompanyPageRoutingModule
  ],
  declarations: [TabsCompanyPage]
})
export class TabsCompanyPageModule {}
