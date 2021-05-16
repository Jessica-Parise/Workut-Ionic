import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PremiumAccountsPageRoutingModule } from './premium-accounts-routing.module';

import { PremiumAccountsPage } from './premium-accounts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PremiumAccountsPageRoutingModule
  ],
  declarations: [PremiumAccountsPage]
})
export class PremiumAccountsPageModule {}
