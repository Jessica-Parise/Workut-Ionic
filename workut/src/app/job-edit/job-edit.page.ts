import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.page.html',
  styleUrls: ['./job-edit.page.scss'],
})

export class JobEditPage implements OnInit {

  id: String; job: any;
  jobTitle: String; jobDescription: String; salary: String;
  countries: any; states: any;
  country: String; state: String;

  constructor(public http: HttpClient, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.id = params['id'];
    });
    this.bindCountryList();
  }

  bindCountryList() {
    // Searching the Countries
    this.http.get('https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/getCountries')
      .subscribe((data) => {
        this.countries = data;
        this.bindStateList();
      });
  }

  bindStateList() {
    // Searching the States
    this.http.get('https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/getStates')
      .subscribe((data) => {
        this.states = data;
        this.searchData();
      });
  }

  searchData() {
    this.http.get('https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/getJob?id=' + this.id)
      .subscribe((data: any) => {
        this.job = data;
        this.jobTitle = data.jobTitle;
        this.jobDescription = data.jobDescription;
        this.salary = data.salary;
        this.country = data.country;
        if (data.country != "Brasil") {
          this.states = [{ "nome": "Outro" }];
          this.state = 'Outro';
        } else {
          this.state = data.state;
        }

      });
  }

  countrySelected() {

    // Verify if the selected country is Brazil
    // and update the States list with all the brazilian states
    if (this.country == 'Brasil') {
      this.bindStateList();
    }

    // Verify if isn't Brazil
    // and update the States list with the 'Outros' option
    else if (this.state != "Outro") {
      this.state = '';
      this.states = [{ "nome": "Outro" }];
    }

  }

}
