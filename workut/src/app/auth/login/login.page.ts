import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(public httpClient: HttpClient) {
  }

  ngOnInit() {
  }

  login() {

    let user = {
      "email": this.email,
      "senha": this.password
    }

    this.httpClient.post("https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/Login", user)
      .subscribe(result => {
        console.log(result);
      }, error => {
        console.log(error);
      });

  }


}