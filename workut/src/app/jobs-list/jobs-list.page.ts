import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.page.html',
  styleUrls: ['./jobs-list.page.scss'],
})
export class JobsListPage implements OnInit {

  Jobs;
  body = {
    "company": {
      "email": "workut@uam.com",
      "password": "UAM123"
    }
  }

  constructor(public http: HttpClient, private router: Router, public alertController: AlertController) { }

  ngOnInit() {
    this.searchJobs();
  }

  async deleteJob(job) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Are you sure?',
      message: 'If you delete this Job, it will be lost forever',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        }, {
          text: 'Ok',
          handler: () => {
            this.delete(job);
          }
        }
      ]
    });

    await alert.present();
  }

  delete(job) {
    this.http.post('https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/CompanyJobsDelete',
      {
        "company": {
          "email": this.body.company.email,
          "password": this.body.company.password
        },
        "id": job._id.$oid
      })
      .subscribe(
        (response) => {
          if (response == 200) {
            this.searchJobs();
          } else {
            console.log(response);
          }
        },
        (error) => {
          console.log('Error: ' + error);
        }
      );
  }

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
    this.router.navigate(['/job-edit', { id: job._id.$oid }]);
    // console.log(job);
  }

}
