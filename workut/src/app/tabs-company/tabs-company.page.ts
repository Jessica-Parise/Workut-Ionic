import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-tabs-company',
  templateUrl: './tabs-company.page.html',
  styleUrls: ['./tabs-company.page.scss'],
})
export class TabsCompanyPage implements OnInit {

  constructor(
    private router: Router, public httpClient: HttpClient, private authService: AuthorizationService) { }

  email: string;
  password: string;
  name: string;

  ngOnInit() {
    this.authService.getCurrentLogin().then(session => {

      if (session != null) {

        this.authService.AutoLogin().then(sessionPage => {

          if (sessionPage === 'tabs-user') {
            this.router.navigate([sessionPage]);
          }

          else {
            this.httpClient.post(
              'https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/CompanyListProfile',
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

      else {
        this.authService.Logout();
      }

    });
  }

  Logout() {
    this.authService.Logout();
  }

}
