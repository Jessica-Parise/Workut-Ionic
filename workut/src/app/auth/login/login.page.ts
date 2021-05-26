import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(
    public httpClient: HttpClient, public toastController: ToastController,
    private router: Router, private authService: AuthorizationService, private db: DbService) { }

  ngOnInit() {
    this.verifySession();
  }

  verifySession() {
    this.authService.AutoLogin().then(x => {
      if (x !== 'cancel') { this.router.navigate([x]); }
    });
  }

  login() {

    const user = {
      email: this.email,
      password: this.password
    };

    this.db.Login(user).then(response => {
      if (response.status === '200.1') {
        this.authService.setCurrentLogin(response.TOKEN, response.id.$oid, '1').then(() => {
          this.router.navigate(['/tabs-user']);
          this.email = '';
          this.password = '';
        });
      } else if (response.status === '200.2') {
        this.authService.setCurrentLogin(response.TOKEN, response.id.$oid, '2').then(() => {
          this.router.navigate(['/tabs-company']);
          this.email = '';
          this.password = '';
        });
      } else if (response.status === '200.3') {
        this.authService.setCurrentLogin(response.TOKEN, response.id.$oid, '3').then(() => {
          this.router.navigate(['/tabs-admin']);
          this.email = '';
          this.password = '';
        });
      } else if (response.status === '404') {
        this.statusAlert('Erro', 'Conta não encontrada!');
      } else {
        this.statusAlert('Erro', 'Ocorreu um erro. Por favor, tente novamente!');
      }
    });

  }

  // Presents an alert for status
  async statusAlert(titlulo, mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000
    });
    toast.present();
  }

}
