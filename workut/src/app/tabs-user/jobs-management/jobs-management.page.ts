import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { DbService } from 'src/app/services/db.service';

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
    private router: Router, private authService: AuthorizationService,
    private toastController: ToastController, private db: DbService) { }

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
    this.db.UserAppliedJobsSearch(this.body).then(response => {
      if (response === '404') {
        this.authService.Logout();
      } else {
        this.Jobs = response;
        for (let i = 0; i < this.Jobs.length; i++) {
          this.db.CompanySearchJob(this.Jobs[i].job).then(jobFound => {
            const applyID = this.Jobs[i]._id.$oid;
            jobFound.applyID = applyID;
            this.Jobs[i] = jobFound;
          });
        }
      }
    },
      (error) => {
        this.statusAlert('Error', 'An error occurred. Please try again!');
      }
    );
  }

  searchJobs_Title() {
    this.db.UserAppliedJobSearch(this.search, this.body).then(response => {
      if (response === '404') {
        this.authService.Logout();
      } else {
        this.Jobs = response;
        for (let i = 0; i < this.Jobs.length; i++) {
          this.db.CompanySearchJob(this.Jobs[i].job).then(jobFound => {
            const applyID = this.Jobs[i]._id.$oid;
            jobFound.applyID = applyID;
            this.Jobs[i] = jobFound;
          });
        }
      }
    },
      (error) => {
        this.statusAlert('Error', 'An error occurred. Please try again!');
      }
    );
  }

  // Presents an alert for status
  async statusAlert(title, mensagem) {
    const alert = await this.toastController.create({
      header: title,
      message: mensagem,
      duration: 1000
    });

    await alert.present();
  }

  deleteJob(job) {
    const body = {
      company: this.body,
      id: job.applyID
    };

    this.db.UserDeleteAppliedJob(body).then(response => {
      if (response === '200') {
        this.searchJobs();
      } else if (response === '404') {
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

}
