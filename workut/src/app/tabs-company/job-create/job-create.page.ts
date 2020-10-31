import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.page.html',
  styleUrls: ['./job-create.page.scss'],
})

export class JobCreatePage implements OnInit {

  public addmore: FormGroup;
  jobTitle: String; jobDescription: String;
  salary: String; startDate: String;
  countries: any; states: any;
  country: String; state: String;
  createdTime: String; skillsRequired;

  constructor(
    public http: HttpClient, private router: ActivatedRoute, 
    private navigationRouter: Router, public alertController: AlertController,
    private fBuilder: FormBuilder) { }

  ngOnInit() {
    this.listInitialValues();
    this.bindCountryList();
    this.bindStateList();
    this.addmore = this.fBuilder.group({
      skill: [''],
      itemRows: this.fBuilder.array([this.initItemRows()])
    });

    this.deleteRow(0);
  }

  get formArr() {
    return this.addmore.get('itemRows') as FormArray;
  }

  initItemRows() {
    return this.fBuilder.group({
      skill: ['']
    });
  }

  addNewRow() {
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
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
        if (this.country == "Brasil") {
          this.states = data;
        }
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
    else {
      this.states = [];
      if (this.state != 'Other' && this.state != 'Any state') {
        this.state = 'Any state';
      }
    }

  }

  saveChanges() {

    this.skillsRequired = this.addmore.value.itemRows;
    this.startDate = new Date().toDateString();

    const body = {
      "company": {
        "email": localStorage.getItem('loggedEmail'),
        "password": localStorage.getItem('loggedPassword')
      },
      "job": {
        "company": localStorage.getItem('loggedID'),
        "jobTitle": this.jobTitle,
        "jobDescription": this.jobDescription,
        "salary": this.salary,
        "startDate": this.startDate,
        "country": this.country,
        "state": this.state,
        "skillsRequired": this.skillsRequired
      }
    }

    this.http.post('https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/CompanyJobsInsert', body)
      .subscribe(
        (response) => {
          if (response == "200") {
            this.createdTime = new Date().toLocaleTimeString();
            this.statusAlert('Success', 'Job data was sucessfully created');
          } else {
            this.statusAlert('Error', 'Error during the creation ... please try again later');
          }
        },
        (error) => {
          this.statusAlert('Error', 'An error occurred. Please try again!');
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
            if (message == 'Job data was sucessfully created') {
              this.navigationRouter.navigate(['/tabs-company/jobs-management', {updated: this.createdTime}]);
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
