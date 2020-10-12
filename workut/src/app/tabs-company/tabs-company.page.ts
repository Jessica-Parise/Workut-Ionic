import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs-company',
  templateUrl: './tabs-company.page.html',
  styleUrls: ['./tabs-company.page.scss'],
})
export class TabsCompanyPage implements OnInit {

  constructor(private router: Router, public httpClient: HttpClient) { }

  email: string;
  password: string;
  name: string;

  ngOnInit() {
    this.verifySession();

    let company = {
      "email": localStorage.getItem('loggedEmail'),
      "password": localStorage.getItem('loggedPassword')
    }

    this.httpClient.post("https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/CompanyListProfile", company)
      .subscribe((result: any) => {
        this.name = result.name
      });
  }

  verifySession() {
    const email = localStorage.getItem('loggedEmail');
    const password = localStorage.getItem('loggedPassword');
    const id = localStorage.getItem('loggedID');
    const type = localStorage.getItem('type');

    if (email == null || password == null || id == null || type == null) {
      this.Logout();
    }

  }

  Logout() {
    localStorage.removeItem('loggedEmail');
    localStorage.removeItem('loggedPassword');
    localStorage.removeItem('loggedID');
    localStorage.removeItem('type');
    this.router.navigate(['/home']);
  }

}
