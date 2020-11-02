import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public popoverController: PopoverController, private router: Router, private authService: AuthorizationService) { }

  ngOnInit() {
    this.verifySession();
  }

  verifySession() {
    this.authService.AutoLogin().then(x => {
      if (x !== 'cancel') { this.router.navigate([x]); }
    });
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      mode: 'ios',
      translucent: true
    });
    return await popover.present();
  }

}