import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  Users;
  body = {
    "email": "workut@uam.com",
    "password": "UAM123"
  }
  
  constructor(public http: HttpClient, private router: Router){}

  ngOnInit(){
    this.searchUsers();
  }

  searchUsers(){
    this.http.post('https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/ListadeUsuarios', this.body)
      .subscribe(
        (response) => {
          this.Users = response;
        },
        (error) => {
          console.log('Error: ' + error);
        }
      );
  }
}
