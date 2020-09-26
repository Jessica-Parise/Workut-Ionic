import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit {

  email: string; password: string;
  name: string; lastname: string;
  country: string; city: string;

  constructor(public http: HttpClient) { }

  ngOnInit() { }

  SignUp() {

    let user = {
      "email": this.email,
      "name": this.name,
      "lastname": this.lastname,
      "password": this.password,
      "country": "",
      "city": ""
    }

    this.http.post('https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/SignUp', user)

      .subscribe(x => {
        console.log(x);
      });



  }

}
