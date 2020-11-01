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
    this.httpClient.post(
      'https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/CompanyListProfile',
      this.authService.getCurrentLogin()
    ).subscribe((result: any) => {
      this.name = result.name;
    });
  }

  Logout() {
    this.authService.Logout();
  }

}
