import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.page.html',
  styleUrls: ['./job-create.page.scss'],
})

export class JobCreatePage implements OnInit {

  jobTitle: String; jobDescription: String;
  salary: String; startDate: String;
  countries: any; states: any;
  country: String; state: String;

  constructor(public http: HttpClient, private router: ActivatedRoute, private navigationRouter: Router, public alertController: AlertController) { }

  ngOnInit() {
    this.bindCountryList();
    this.bindStateList();
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
        this.listInitialValues();
      });
  }

  listInitialValues() {
    this.country = 'Any country';
    this.state = 'Any state';
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

  saveChanges() {

    this.startDate = new Date().toLocaleDateString();


    const body = {
      "company": {
        "email": "workut@uam.com",
        "password": "UAM123"
      },
      "job": {
        "company": "5f6e9542e88085f005b9ca76",
        "jobTitle": this.jobTitle,
        "jobDescription": this.jobDescription,
        "salary": this.salary,
        "startDate": this.startDate,
        "country": this.country,
        "state": this.state
      }
    }

    this.http.post('https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/CompanyJobsInsert', body)
      .subscribe(
        (response) => {
          if (response == "200") {
            this.statusMessage('Sucess', 'Job data was sucessfully created');
          } else {
            this.statusMessage('Error', 'Error during the creation ... please try again later');
          }
        },
        (error) => {
          console.log('Error: ' + error);
        }
      );

  }

  async statusMessage(title, message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      message: message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navigationRouter.navigate(['/jobs-list']);
          }
        }
      ]
    });

    await alert.present();
  }

}
