import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PremiumAccountsPage } from './premium-accounts.page';

const routes: Routes = [
  {
    path: '',
    component: PremiumAccountsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PremiumAccountsPageRoutingModule {}
