import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit {

  search;
  Jobs;
  body;

  constructor(
    public http: HttpClient, public toastController: ToastController,
    private router: Router, private authService: AuthorizationService, private db: DbService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.authService.verifySession('1').then(() => {
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

  searchJobs() {
    this.db.ListJobs(this.body).then(response => {
      if (response === '404') {
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
    const alert = await this.toastController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  searchJobs_Title() {
    this.db.SearchJobs(this.search, this.body).then(response => {
      if (response === '404') {
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

  applyJob(job) {
    const body = {
      session: this.body,
      job: job._id.$oid,
      date: new Date().toDateString()
    };
    this.db.UserApplyForJob(body).then(response => {
      if (response === '200') {
        this.statusAlert('Sucess', 'You have been applied for that job, wait an company contact in your email!');
      } else if (response === '404') {
        this.authService.Logout();
      } else {
        this.statusAlert('Error', 'An error occurred. Please try again!');
      }
    });
  }

}
