import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-tabs-company',
  templateUrl: './tabs-company.page.html',
  styleUrls: ['./tabs-company.page.scss'],
})
export class TabsCompanyPage implements OnInit {

  constructor(
    private router: Router, public httpClient: HttpClient,
    private authService: AuthorizationService, private db: DbService) { }

  email: string;
  password: string;
  name: string;

  ngOnInit() {
    this.init();
  }

  init() {
    this.authService.getCurrentLogin().then(session => {
      if (session != null) {
        this.db.CompanyListProfile(session).then(result => {
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
