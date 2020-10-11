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
    this.verifySession();
  }

  verifySession() {
    const email = localStorage.getItem('loggedEmail');
    const password = localStorage.getItem('loggedPassword');
    const id = localStorage.getItem('loggedID');
    const type = localStorage.getItem('type');
    
    if (email != null || password != null || id != null || type != null) {
      if(type=="1") {
        this.router.navigate(['/tabs-user']);
      }else{
        this.router.navigate(['/tabs-company']);
      }
    }

  }

  login() {

    let user = {
      "email": this.email,
      "password": this.password
    }

    this.httpClient.post("https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/Login", user)
      .subscribe((result: any) => {
        
        // User Login
        if (result.status == '200.1') {

          const logged = {
            "email": this.email,
            "password": this.password,
            "id": result.id.$oid,
            "type": '1'
          };

          localStorage.setItem('loggedEmail', logged.email);
          localStorage.setItem('loggedPassword', logged.password);
          localStorage.setItem('loggedID', logged.id);
          localStorage.setItem('type', logged.type);
          this.router.navigate(['/tabs-user']);

        } 
        
        // Company Login
        else if (result.status == '200.2') {
          
          const logged = {
            "email": this.email,
            "password": this.password,
            "id": result.id.$oid,
            "type": '2'
          };

          localStorage.setItem('loggedEmail', logged.email);
          localStorage.setItem('loggedPassword', logged.password);
          localStorage.setItem('loggedID', logged.id);
          localStorage.setItem('type', logged.type);
          this.router.navigate(['/tabs-company']);

        } 
        
        // Login Errors
        else if (result.status == '404') {
          this.statusAlert('Erro', 'Conta não encontrada!');
        } else {
          this.statusAlert('Erro', 'Ocorreu um erro, por favor tente novamente!');
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