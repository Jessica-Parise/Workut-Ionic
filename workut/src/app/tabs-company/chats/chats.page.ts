import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { DbService } from 'src/app/services/db.service';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  Contacts = [];
  currentContact = '';
  currentContactType = '';
  currentContactId = '';
  LOGIN: any;
  message = '';
  qteMsg = 0;

  Mensagens: any;

  constructor(
    private authService: AuthorizationService, private db: DbService,
    private fBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.authService.verifySession('2').then(() => {
      this.authService.getCurrentLogin().then(LOGIN => {
        this.LOGIN = LOGIN;
        if (LOGIN == null) {
          this.authService.Logout();
        }
        this.LoadContacts();
      });
    });
    this.Mensagens = this.fBuilder.group({
      mensagem: [''],
      itemRows: this.fBuilder.array([this.initItemRows()])
    });
    this.mensagens.removeAt(0);
  }

  initItemRows(): any {
    return this.fBuilder.group({
      mensagem: [''],
    });
  }

  initItemWithtext(mensagem: string): any {
    return this.fBuilder.group({
      mensagem: [mensagem]
    });
  }

  addItemWithText(mensagem: string): void {
    this.mensagens.push(this.initItemWithtext(mensagem));
  }

  resetMessages(): void {
    for (let i = this.qteMsg; i !== -1; i--) {
      this.mensagens.removeAt(i);
    }
  }

  get mensagens(): any {
    return this.Mensagens.get('itemRows') as FormArray;
  }

  LoadContacts(): void {
    this.db.getReceivedContacts(this.LOGIN).then(received => {
      this.db.getSentContacts(this.LOGIN).then(sent => {
        let i = 0;

        // tslint:disable-next-line: prefer-for-of
        for (let j = 0; j < sent.length; j++) {
          this.db.getSomeone(sent[j].user2).then(response => {
            this.Contacts[i] = { id: sent[j]._id.$oid, name: response.name, type: '1' }; i++;
          }, (error) => { /* this.statusAlert('Error', 'An error occurred. Please try again!'); */ });
        }

        // tslint:disable-next-line: prefer-for-of
        for (let j = 0; j < received.length; j++) {
          this.db.getSomeone(received[j].user1).then(response => {
            this.Contacts[i] = { id: received[j]._id.$oid, name: response.name, type: '2' }; i++;
          }, (error) => { /* this.statusAlert('Error', 'An error occurred. Please try again!'); */ });
        }

      }, (error) => { /* this.statusAlert('Error', 'An error occurred. Please try again!'); */ });

    }, (error) => { /* this.statusAlert('Error', 'An error occurred. Please try again!'); */ });
  }

  changeCurrentContact(id: string, contact: string, type: string): void {
    this.resetMessages();
    if (id !== this.currentContactId) {
      this.currentContact = contact;
      this.currentContactType = type;
      this.currentContactId = id;
      this.LoadMessagesHistory();
    } else {
      this.currentContact = null;
      this.currentContactType = null;
      this.currentContactId = null;
    }
  }

  SendMessage(): void {
    this.db.postChatMessage(this.LOGIN, this.currentContactId, this.message, this.currentContactType).then(response => {
    }, (error) => { /* this.statusAlert('Error', 'An error occurred. Please try again!'); */ });
  }

  LoadMessagesHistory(): void {
    this.db.getChatMessagesHistory(this.LOGIN, this.currentContactId, this.currentContactType).then(response => {
      for (let i = 0; i < response.length; i++) {
        this.addItemWithText(response[i].message);
        this.qteMsg++;
      }
    }, (error) => { /* this.statusAlert('Error', 'An error occurred. Please try again!'); */ });
  }

}
