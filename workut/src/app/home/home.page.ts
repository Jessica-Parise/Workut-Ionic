import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  Jobs;
  body = {
    "email": "jessica@workut.com",
    "password": "senha"
  }
  
  constructor(public http: HttpClient, private router: Router){}

  ngOnInit(){
    this.searchJobs();
  }

  searchJobs(){
    this.http.post('https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/listJobs', this.body)
      .subscribe(
        (response) => {
          this.Jobs = response;
        },
        (error) => {
          console.log('Error: ' + error);
        }
      );
  }
}