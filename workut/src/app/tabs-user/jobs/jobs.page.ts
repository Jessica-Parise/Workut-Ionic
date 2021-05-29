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
  premium;

  normalJobs_count;
  premiumJobs_count;

  constructor(
    public http: HttpClient, public toastController: ToastController,
    private router: Router, private authService: AuthorizationService, private db: DbService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.Jobs = null;
    this.authService.verifySession('1').then(() => {
      this.authService.getCurrentLogin().then(LOGIN => {
        if (LOGIN != null) {
          this.body = LOGIN;
          this.premium = LOGIN.premium;
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
    this.db.listPremiumJobs(this.body).then(response_p => {
      if (response_p === '404') {
        this.authService.Logout();
      } else {
        this.Jobs = response_p;
        this.premiumJobs_count = response_p.length;
        this.db.listJobs(this.body).then(response => {
          if (response === '404') {
            this.authService.Logout();
          } else {

            this.normalJobs_count = response_p.length;

            if (this.Jobs.length !== (this.premiumJobs_count + this.normalJobs_count)) {
              let count = 0;
              response.forEach(value => {
                this.Jobs[this.premiumJobs_count + count] = value;
                count++;
              });
            }

            let i = -1;

            this.Jobs.forEach(value => {
              i++;

              this.db.verifyAppliedStatus(this.body.ID, value._id.$oid).then(applyStatus => {
                if (applyStatus == null) {
                  value.applied = false;
                } else {
                  value.applied = true;
                }
              });

              this.db.SearchCompany(value.company).then(companyFound => {
                if (companyFound == null) {
                  this.Jobs.splice(i);
                } else {
                  value.companyID = companyFound._id.$oid;
                  value.companyName = companyFound.name;
                  value.companyEmail = companyFound.email;
                  value.companyImg = companyFound.img;
                }
              });

            });

          }
        },
          (error) => {
            this.statusAlert('Error', 'An error occurred. Please try again!');
          }
        );

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
      duration: 2000
    });

    await alert.present();
  }

  searchJobs_Title() {
    this.db.SearchJobs(this.search, this.body).then(response => {
      if (response === '404') {
        this.authService.Logout();
      } else {
        this.Jobs = response;
        let i = -1;

        this.Jobs.forEach(value => {
          i++;

          this.db.verifyAppliedStatus(this.body.ID, value._id.$oid).then(applyStatus => {
            if (applyStatus == null) {
              value.applied = false;
            } else {
              value.applied = true;
            }
          });

          this.db.SearchCompany(value.company).then(companyFound => {
            if (companyFound == null) {

            } else {
              value.companyName = companyFound.name;
              value.companyEmail = companyFound.email;
            }
          });

        });
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
        this.searchJobs();
      } else if (response === '404') {
        this.authService.Logout();
      } else {
        this.statusAlert('Error', 'An error occurred. Please try again!');
      }
    });
  }

  showJob(job) {
    this.router.navigate(['/job-details', { id: job._id.$oid }]);
  }

  startChat(item): void {
    this.db.User_CreateContact(this.body, item.companyID).then(response => {
      this.router.navigate(['/tabs-user/chats']);
    });
  }

}
