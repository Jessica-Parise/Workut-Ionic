import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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
  updateTime: String;

  constructor(public http: HttpClient, private router: ActivatedRoute, private navigationRouter: Router, public alertController: AlertController) { }

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
        if (this.state == null) {
          this.searchData();
        }
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
        if (data.country != "Brazil") {
          this.states = [];
          this.state = data.state;
        } else {
          this.state = data.state;
        }

      });
  }

  countrySelected() {

    // Verify if the selected country is Brazil
    // and update the States list with all the brazilian states
    if (this.country == 'Brazil') {
      this.bindStateList();
    }

    else {
      this.states = [];
      if (this.state != 'Other' && this.state != 'Any state') {
        this.state = 'Any state';
      }
    }

  }

  saveChanges() {

    const body = {
      "company": {
        "email": localStorage.getItem('loggedEmail'),
        "password": localStorage.getItem('loggedPassword')
      },
      "job": {
        "id": this.id,
        "jobTitle": this.jobTitle,
        "jobDescription": this.jobDescription,
        "salary": this.salary,
        "country": this.country,
        "state": this.state
      }
    }

    this.http.post('https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/CompanyJobsEdit', body)
      .subscribe(
        (response) => {
          if (response == "200") {
            this.updateTime = new Date().toLocaleTimeString();
            this.statusAlert('Sucess', 'Job data was sucessfully updated');
          } else {
            this.statusAlert('Error', 'Error during the update ... please try again later');
          }
        },
        (error) => {
          this.statusAlert('Erro', 'An error occurred ... please try again later');
        }
      );

  }

  async statusAlert(title, message) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            if (message == 'Job data was sucessfully updated') {
              this.navigationRouter.navigate(['/tabs-company/jobs-management', { updated: this.updateTime }]);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  Logout() {
    localStorage.removeItem('loggedEmail');
    localStorage.removeItem('loggedPassword');
    localStorage.removeItem('loggedID');
    localStorage.removeItem('type');
    this.navigationRouter.navigate(['/login']);
  }

}