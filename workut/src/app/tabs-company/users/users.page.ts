import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  search: any;
  Users: any;
  body;

  constructor(
    public http: HttpClient, public alertController: AlertController,
    private router: Router, private authService: AuthorizationService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.authService.verifySession('2').then(() => {
      this.authService.getCurrentLogin().then(LOGIN => {
        if (LOGIN != null) {
          this.body = LOGIN;
          this.searchUsers();
        } else {
          this.authService.Logout();
        }
      });
    });
  }

  searchUsers() {
    this.http.post(
      'https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/ListadeUsuarios', this.body
    ).subscribe(
      (response) => {
        if (response == '404') {
          this.authService.Logout();
        } else {
          this.Users = response;
        }
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

  searchUsers_Country() {
    this.http.post('https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/CompanyUsersSearch_Country?search=' + this.search,
      this.body)
      .subscribe(
        (response) => {
          if (response == '404') {
            this.authService.Logout();
          } else {
            this.Users = response;
          }
        },
        (error) => {
          this.statusAlert('Error', 'An error occurred. Please try again!');
        }
      );
  }

}
