import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(public httpClient: HttpClient, public alertController: AlertController, private router: Router) {
  }

  ngOnInit() {
  }

  login() {

    let user = {
      "email": this.email,
      "password": this.password
    }

    this.httpClient.post("https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/Login", user)
      .subscribe(result => {
        if (result == '201' || result == '202') {
          this.router.navigate(['/home']);
        } else if (result == '404') {
          this.statusAlert('Erro', 'Conta não encontrada!');
        }
      }, error => {
        this.statusAlert('Erro', 'Ocorreu um erro, por favor tente novamente!');
      });

  }

  // Presents an alert for status
  async statusAlert(title, message) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}