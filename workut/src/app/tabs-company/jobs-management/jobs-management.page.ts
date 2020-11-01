import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-jobs-management',
  templateUrl: './jobs-management.page.html',
  styleUrls: ['./jobs-management.page.scss'],
})
export class JobsManagementPage implements OnInit {

  search;
  Jobs;
  body = this.authService.getCurrentLogin();

  constructor(
    public http: HttpClient, private router: Router,
    public alertController: AlertController, private authService: AuthorizationService) { }

  ngOnInit() {
    this.authService.verifySession('2');
    this.searchJobs();
  }

  ionViewDidEnter() {
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
        company: this.body,
        id: job._id.$oid
      })
      .subscribe(
        (response) => {
          if (response == 200) {
            this.searchJobs();
          } else if (response == 404) {
            this.authService.Logout();
          } else {
            this.statusAlert('Error', 'An error occurred. Please try again!');
          }
        },
        (error) => {
          this.statusAlert('Error', 'An error occurred. Please try again!');
        }
      );
  }

  searchJobs() {
    this.http.post(
      'https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/CompanyJobsSearch', this.body
    ).subscribe(
      (response) => {
        if (response == '404') {
          this.authService.Logout();
        } else {
          this.Jobs = response;
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
      buttons: ['OK']
    });

    await alert.present();
  }

  editJob(job) {
    this.router.navigate(['/tabs-company/job-edit', { id: job._id.$oid }]);
  }

  searchJobs_Title() {
    this.http.post(
      'https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/CompanyJobsSearch_Title?search='
      + this.search, this.body
    ).subscribe(
      (response) => {
        if (response == '404') {
          this.authService.Logout();
        } else {
          this.Jobs = response;
        }
      },
      (error) => {
        this.statusAlert('Error', 'An error occurred. Please try again!');
      }
    );
  }

}