import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(
    public httpClient: HttpClient, public alertController: AlertController,
    private router: Router, private authService: AuthorizationService) { }

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

    this.httpClient.post("https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/Login", user)
      .subscribe((result: any) => {

        // User Login @Douglas trocou == por ===
        if (result.status === '200.1') {
          this.authService.setCurrentLogin(this.email, result.TOKEN, result.id.$oid, '1').then((x) => {
            this.email = '';
            this.password = '';
            this.router.navigate(['/tabs-user']);
          });
        }

        // Company Login @Douglas trocou == por ===
        else if (result.status === '200.2') {
          this.authService.setCurrentLogin(this.email, result.TOKEN, result.id.$oid, '2').then((x) => {
            this.email = '';
            this.password = '';
            this.router.navigate(['/tabs-company']);
          });
        }

        // Login Errors
        else if (result.status === '404') {
          this.statusAlert('Error', 'Account not found!');
        } else {
          this.statusAlert('Error', 'An error occurred. Please try again!');
        }

      }, error => {
        this.statusAlert('Error', 'An error occurred. Please try again!');
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