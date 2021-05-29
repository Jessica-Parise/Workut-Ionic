import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { DbService } from 'src/app/services/db.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-premium-accounts',
  templateUrl: './premium-accounts.page.html',
  styleUrls: ['./premium-accounts.page.scss'],
})
export class PremiumAccountsPage implements OnInit {

  LOGIN: any;
  Accounts; bckAccounts;
  search: string;

  constructor(
    private authService: AuthorizationService, private db: DbService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.authService.verifySession('2').then(() => {
      this.authService.getCurrentLogin().then(LOGIN => {
        this.LOGIN = LOGIN;
        if (LOGIN == null) {
          this.authService.Logout();
        } else {
          this.listAccounts();
        }
      });
    });
  }

  listAccounts() {
    this.LOGIN.searchType = 1;
    this.db.getAccounts(this.LOGIN).then(users => {
      this.LOGIN.searchType = 2;
      this.db.getAccounts(this.LOGIN).then(companies => {
        this.Accounts = users;
        for (let i = 0; i < companies.length; i++) {
          if (companies[i].email != 'admin@workut.com') {
            this.Accounts[this.Accounts.length] = companies[i];
          }
        }
        this.bckAccounts = this.Accounts;
      }).catch(() => { this.statusAlert('Error', 'An error occurred. Please try again!') });

    }).catch(() => { this.statusAlert('Error', 'An error occurred. Please try again!') });
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

  searchAccounts() {

    if (this.search === '') {
      this.listAccounts();
    } else {
      for (let i = 0; i < this.bckAccounts.length;) {
        if (!(this.bckAccounts[i].name.toLowerCase()).includes((this.search).toLowerCase())) {
          this.Accounts.splice(i);
        } else {
          this.Accounts.splice(i, 1, this.bckAccounts[i]);
        }
        i++;
      }
    }

  }

  ActivePremium(id: string) {
    this.db.setPremiumAccount(this.LOGIN, id).then(response => {
      if (response == 200) {
        this.listAccounts();
        this.statusAlert('Sucesso', 'Conta Premium ativa!');
      } else {
        
    console.log(response);
        this.statusAlert('Erro', 'Não foi possível ativar a Conta Premium!');
      }
    }).catch(() => { this.statusAlert('Erro', 'Não foi possível ativar a Conta Premium!'); });
  }

}
