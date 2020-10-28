import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.page.html',
  styleUrls: ['./job-edit.page.scss'],
})

export class JobEditPage implements OnInit {

  public addmore: FormGroup;

  id: string; job: any;
  jobTitle: string; jobDescription: string; salary: string;
  countries: any; states: any;
  country: string; state: string;

  constructor(
    public http: HttpClient, private router: ActivatedRoute,
    private navigationRouter: Router, public alertController: AlertController,
    private fBuilder: FormBuilder) { }

  ngOnInit() {

    this.router.params.subscribe(params => {
      this.id = params['id'];
    });
    this.bindCountryList();

    this.addmore = this.fBuilder.group({
      skill: [''],
      itemRows: this.fBuilder.array([this.initItemRows()])
    });

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

  search_initItemRows(value: string) {
    return this.fBuilder.group({
      skill: [value]
    });
  }

  search_addNewRow(value: string) {
    this.formArr.push(this.search_initItemRows(value));
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
        if (data.country != "Brasil") {
          this.states = [];
          this.state = data.state;
        } else {
          this.state = data.state;
        }

        // Removes the first row because its always be empty
        this.deleteRow(0);

        if (data.skillsRequired != undefined && data.skillsRequired != null) {

          this.deleteRow(0);
          data.skillsRequired.forEach(item => {
            this.search_addNewRow(item.skill);
          });

        }

      });
  }

  countrySelected() {

    // Verify if the selected country is Brazil
    // and update the States list with all the brazilian states
    if (this.country == 'Brasil') {
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
        "email": "workut@uam.com",
        "password": "UAM123"
      },
      "job": {
        "id": this.id,
        "jobTitle": this.jobTitle,
        "jobDescription": this.jobDescription,
        "salary": this.salary,
        "country": this.country,
        "state": this.state,
        "skillsRequired": this.addmore.value.itemRows
      }
    }

    this.http.post('https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/CompanyJobsEdit', body)
      .subscribe(
        (response) => {
          if (response == "200") {
            this.statusMessage('Sucess', 'Job data was sucessfully updated');
          } else {
            this.statusMessage('Error', 'Error during the update ... please try again later');
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
