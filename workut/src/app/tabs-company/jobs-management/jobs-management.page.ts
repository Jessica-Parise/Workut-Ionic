import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
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
  premium;
  jobs_banner;
  bannerID;

  constructor(
    public http: HttpClient, private router: Router, public alertController: AlertController,
    public toastController: ToastController, private authService: AuthorizationService, private db: DbService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.Jobs = null;
    this.authService.verifySession('2').then(() => {
      this.authService.getCurrentLogin().then(LOGIN => {
        if (LOGIN != null) {
          this.body = LOGIN;
          this.premium = LOGIN.premium;
          this.searchJobs();
          this.searchJobsToBanner();
        } else {
          this.authService.Logout();
        }
      });
    });
  }

  ionViewDidEnter() {
    this.init();
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

    const body = {
      company: this.body,
      id: job._id.$oid
    };

    this.db.DeleteJob(body).then(response => {
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

  searchJobs() {
    this.db.CompanyListJobs(this.body).then(response => {
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

  // Presents an alert for status
  async statusAlert(title, mensagem) {
    const alert = await this.toastController.create({
      header: title,
      message: mensagem,
      duration: 1000
    });

    await alert.present();
  }

  editJob(job) {
    this.router.navigate(['/tabs-company/job-edit', { id: job._id.$oid }]);
  }

  searchJobs_Title() {
    this.db.CompanySearchJobs(this.search, this.body).then(response => {
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

  searchJobsToBanner() {
    this.db.listCompanyJobsToCreateBanner(this.body).then(response => {
      if (response === '404') {
        this.authService.Logout();
      } else {
        this.jobs_banner = response;
      }
    },
      (error) => {
        this.statusAlert('Error', 'An error occurred. Please try again!');
      }
    );
  }

  jobSelected() {
    console.log(this.bannerID);

    this.db.listCompanyJobsToCreateBanner(this.body).then(response => {
      if (response === '404') {
        this.authService.Logout();
      } else {

        let deleted = 0;

        response.forEach(element => {
          this.db.disableBanner(this.body, element._id.$oid).then(status => {

            deleted++;
            if(deleted == response.length){
              this.db.createBanner(this.body, this.bannerID).then(statusResponse=>{
                if(statusResponse == '200'){
                  this.statusAlert("Sucesso", "Banner Criado com Sucesso!");
                }
              });
            }

          })
        });

      }
    },
      (error) => {
        this.statusAlert('Error', 'An error occurred. Please try again!');
      }
    );

  }

}