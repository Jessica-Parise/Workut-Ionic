import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit {

  search;
  Jobs;
  body = {
    user: this.authService.getCurrentLogin()
  };

  constructor(
    public http: HttpClient, public alertController: AlertController,
    private router: Router, private authService: AuthorizationService) { }

  ngOnInit() {
    this.authService.verifySession('1');
    this.searchJobs();
  }

  searchJobs() {
    this.http.post(
      'https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/listJobs', this.body.user
    ).subscribe(
      (response) => {
        this.Jobs = response;
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

  searchJobs_Title() {
    this.http.post('https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/UserJobsSearch_Title?search=' + this.search,
      this.body)
      .subscribe(
        (response) => {
          this.Jobs = response;
        },
        (error) => {
          this.statusAlert('Error', 'An error occurred. Please try again!');
        }
      );
  }

}
