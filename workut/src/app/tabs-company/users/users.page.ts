import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  Users;
  body = {
    "email": "workut@uam.com",
    "password": "UAM123"
  }
  constructor(public http: HttpClient, public alertController: AlertController, private router: Router) { }

  ngOnInit() {
    this.searchUsers();
  }

  searchUsers(){
    this.http.post('https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/ListadeUsuarios', this.body)
      .subscribe(
        (response) => {
          this.Users = response;
        },
        (error) => {
          this.statusAlert('Erro', 'An error occurred. Please try again!');
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
  
  Logout(){
    localStorage.removeItem('loggedEmail');
    localStorage.removeItem('loggedPassword');
    localStorage.removeItem('loggedID');
    localStorage.removeItem('type');
    this.router.navigate(['/home']);
  }

}
