import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { DbService } from 'src/app/services/db.service';

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
    public http: HttpClient, public toastController: ToastController,
    private router: Router, private authService: AuthorizationService, private db: DbService) { }

  ngOnInit() {
    this.init();
  }
  openCV(item){
    
    this.router.navigate(['/user-curriculum', { id: item._id.$oid}]);
    
  }

  init() {
    this.Users = null;
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

  ionViewDidEnter() {
    this.init();
  } 
  searchUsers() {
    this.db.ListUsers(this.body).then(response => {
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

  async statusAlert(title, mensagem) {
    const alert = await this.toastController.create({
      header: title,
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }

  searchUsers_Country() {
    this.db.SearchUsers(this.search, this.body).then(response => {
      if (response === '404') {
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
