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
  body = {
    company: this.authService.getCurrentLogin()
  };

  constructor(
    public http: HttpClient, public alertController: AlertController,
    private router: Router, private authService: AuthorizationService) { }

  ngOnInit() {
    this.authService.verifySession('2');
    this.searchUsers();
  }

  searchUsers() {
    this.http.post('https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/ListadeUsuarios', this.body.company)
      .subscribe(
        (response) => {
          this.Users = response;
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
          this.Users = response;
        },
        (error) => {
          this.statusAlert('Error', 'An error occurred. Please try again!');
        }
      );
  }

}
