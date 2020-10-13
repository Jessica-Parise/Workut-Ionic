import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-jobs-management',
  templateUrl: './jobs-management.page.html',
  styleUrls: ['./jobs-management.page.scss'],
})
export class JobsManagementPage implements OnInit {

  search;
  Jobs;
  body = {
    "company": {
      "email": localStorage.getItem('loggedEmail'),
      "password": localStorage.getItem('loggedPassword'),
      "id": localStorage.getItem('loggedID')
    }
  }

  constructor(public http: HttpClient, private router: Router, public alertController: AlertController) { }

  ngOnInit() {
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
            this.statusAlert('Erro', 'An error occurred. Please try again!');
          }
        },
        (error) => {
          this.statusAlert('Erro', 'An error occurred. Please try again!');
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
          this.statusAlert('Erro', 'An error occurred. Please try again!');
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
    this.http.post('https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/CompanyJobsSearch_Title?search=' + this.search,
      this.body)
      .subscribe(
        (response) => {
          this.Jobs = response;
        },
        (error) => {
          this.statusAlert('Erro', 'An error occurred. Please try again!');
        }
      );
  }

  Logout() {
    localStorage.removeItem('loggedEmail');
    localStorage.removeItem('loggedPassword');
    localStorage.removeItem('loggedID');
    localStorage.removeItem('type');
    this.router.navigate(['/login']);
  }

}