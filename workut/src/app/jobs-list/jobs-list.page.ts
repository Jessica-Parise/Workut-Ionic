import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.page.html',
  styleUrls: ['./jobs-list.page.scss'],
})
export class JobsListPage implements OnInit {

  constructor(public http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.searchJobs();
  }

  body = {
    "company": {
      "email": "workut@uam.com",
      "password": "UAM123"
    }
  }

  Jobs: any;

  searchJobs() {
    this.http.post('https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/CompanyJobsSearch', this.body)
      .subscribe(
        (response) => {
          this.Jobs = response;
        },
        (error) => {
          console.log('Error: ' + error);
        }
      );
  }

  editJob(job) {
    console.log(job);
  }

  deleteJob(job) {
    console.log(job);
  }

}
