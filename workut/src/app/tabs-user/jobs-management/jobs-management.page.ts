import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-jobs-management',
  templateUrl: './jobs-management.page.html',
  styleUrls: ['./Jobs-management.page.scss'],
})
export class JobsManagementPage implements OnInit {

  search;
  Jobs;
  body;

  constructor(
    private router: Router, private authService: AuthorizationService,
    private toastController: ToastController, private db: DbService, private alertController: AlertController) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.Jobs = null;
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

  ionViewDidEnter() {
    this.init();
  }

  searchJobs() {
    this.db.UserAppliedJobsSearch(this.body).then(response => {
      if (response === '404') {
        this.authService.Logout();
      } else {
        this.Jobs = response;
        for (let i = 0; i < this.Jobs.length; i++) {
          this.db.SearchJob(this.Jobs[i].job).then(jobFound => {
            if (jobFound == null || jobFound == undefined) {
              this.Jobs.splice(i);
            } else {
              jobFound.applyID = this.Jobs[i]._id.$oid;
              this.Jobs[i] = jobFound;

              this.db.SearchCompany(jobFound.company).then(companyFound => {
                if (companyFound != null && this.Jobs[i] != null) {
                  this.Jobs[i].companyName = companyFound.name;
                  this.Jobs[i].companyEmail = companyFound.email;
                  this.Jobs = this.Jobs;
                } else {
                  this.Jobs.splice(i);
                }
              });
            }
          }).catch(err => {

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

  delete(job) {
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

  showJob(job) {
    this.router.navigate(['/job-details', { id: job._id.$oid }]);
  }

  async deleteJob(job) {
    const alert = await this.alertController.create({
      header: "Are you sure?",
      message: "If you press 'OK' you will cancel your apply for this job!",
      buttons: [{
        text: "Cancel",
        role: "cancel",
        handler: () => {

        }
      },
      {
        text: "Ok",
        handler: () => {
          this.delete(job);
        }
      }]
    });

    await alert.present();
  }
}
