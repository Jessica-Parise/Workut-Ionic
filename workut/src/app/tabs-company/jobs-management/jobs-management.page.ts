import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-jobs-management',
  templateUrl: './jobs-management.page.html',
  styleUrls: ['./jobs-management.page.scss'],
})
export class JobsManagementPage implements OnInit {

  search;
  Jobs;
  body;

  constructor(
    public http: HttpClient, private router: Router,
    public toastController: ToastController, private authService: AuthorizationService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.authService.verifySession('2').then(() => {
      this.authService.getCurrentLogin().then(LOGIN => {
        if (LOGIN != null) {
          this.body = LOGIN;
          this.searchJobs();
        } else {
          this.authService.Logout();
        }
      });
    });
  }

  async deleteJob(job) {
    const alert = await this.toastController.create({
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

  async statusAlert(title, mensagem) {
    const alert = await this.toastController.create({     
      message: mensagem, 
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