import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public popoverController: PopoverController, private router: Router) { }

  ngOnInit() {
    this.verifySession();
  }

  verifySession() {
    const email = localStorage.getItem('loggedEmail');
    const password = localStorage.getItem('loggedPassword');
    const id = localStorage.getItem('loggedID');
    const type = localStorage.getItem('type');

    if (email != null || password != null || id != null || type != null) {
      if (type == "1") {
        this.router.navigate(['/tabs-user']);
      } else {
        this.router.navigate(['/tabs-company']);
      }
    }

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