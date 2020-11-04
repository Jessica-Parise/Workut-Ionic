import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-tabs-user',
  templateUrl: './tabs-user.page.html',
  styleUrls: ['./tabs-user.page.scss'],
})
export class TabsUserPage implements OnInit {

  constructor(
    private router: Router, public httpClient: HttpClient, private authService: AuthorizationService) { }

  email: string;
  password: string;
  name: string;

  ngOnInit() {
    this.init();
  }

  init() {
    this.authService.getCurrentLogin().then(session => {

      if (session != null) {

        this.httpClient.post(
          'https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/UserListProfile',
          session
        ).subscribe((result: any) => {

          if (result === '404') {
            this.authService.Logout();
          } else {
            this.name = result.name;
          }

        });

      }

    });
  }

  Logout() {
    this.authService.Logout();
  }

}
