import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  Contacts = [{ contactName: 'Florzinha' }, { contactName: 'Docinho' }, { contactName: 'Lindinha' }];
  currentContact = '';

  constructor() { }

  ngOnInit() {
  }

  changeCurrentContact(contact: string): void {
    this.currentContact = contact;
  }

}
