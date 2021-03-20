import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  Contacts = [];
  currentContact = '';
  LOGIN;

  constructor(private authService: AuthorizationService, private db: DbService) { }

  ngOnInit() {
    this.authService.verifySession('1').then(() => {
      this.authService.getCurrentLogin().then(LOGIN => {
        this.LOGIN = LOGIN;
        if (LOGIN == null) {
          this.authService.Logout();
        }
        this.LoadContacts();
      });
    });
  }

  LoadContacts(): void {
    this.db.getReceivedContacts(this.LOGIN).then(received => {
      this.db.getSentContacts(this.LOGIN).then(sent => {
        let i = 0;

        // tslint:disable-next-line: prefer-for-of
        for (let j = 0; j < sent.length; j++) {
          this.db.getSomeone(sent[j].user2).then(response => {
            this.Contacts[i] = { name: response.name }; i++;
          }, (error) => { /* this.statusAlert('Error', 'An error occurred. Please try again!'); */ });
        }

        // tslint:disable-next-line: prefer-for-of
        for (let j = 0; j < received.length; j++) {
          this.db.getSomeone(received[j].user1).then(response => {
            this.Contacts[i] = { name: response.name }; i++;
          }, (error) => { /* this.statusAlert('Error', 'An error occurred. Please try again!'); */ });
        }

        console.log(this.Contacts);

      }, (error) => { /* this.statusAlert('Error', 'An error occurred. Please try again!'); */ });

    }, (error) => { /* this.statusAlert('Error', 'An error occurred. Please try again!'); */ });
  }

  changeCurrentContact(contact: string): void {
    this.currentContact = contact;
  }

}
