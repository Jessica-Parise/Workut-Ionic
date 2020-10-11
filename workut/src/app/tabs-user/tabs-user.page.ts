import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs-user',
  templateUrl: './tabs-user.page.html',
  styleUrls: ['./tabs-user.page.scss'],
})
export class TabsUserPage implements OnInit {

  constructor(private router: Router, public httpClient: HttpClient) { }

  email: string;
  password: string;
  nome: string;

  ngOnInit() {
    this.verifySession();

    let user = {
      "email": localStorage.getItem('loggedEmail'),
      "password": localStorage.getItem('loggedPassword')
    }

    this.httpClient.post("https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/UserListProfile", user)
      .subscribe((result: any) => {
        this.nome = result.name
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
