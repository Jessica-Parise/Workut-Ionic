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

  async deleteJob(job) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Você tem certeza?',
      message: 'Esta vaga será deletada para sempre',
      buttons: [
        {
          text: 'Cancelar',
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
        this.statusAlert('Erro', 'Um erro ocorreu. Tente novamente mais tarde!');
      }
    },
      (error) => {
        this.statusAlert('Erro', 'Um erro ocorreu. Tente novamente mais tarde!');
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
        this.statusAlert('Erro', 'Um erro ocorreu. Tente novamente mais tarde!');
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
        this.statusAlert('Erro', 'Um erro ocorreu. Tente novamente mais tarde!');
      }
    );
  }

}