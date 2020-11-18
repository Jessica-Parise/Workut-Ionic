import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drive',
  templateUrl: './drive.page.html',
  styleUrls: ['./drive.page.scss'],
})
export class DrivePage implements OnInit {


  image = 'https://miro.medium.com/max/2400/1*7m6SuqOuypmFZy6OuiHP8w.jpeg';
  file: File;

  constructor() { }

  ngOnInit() {
  }

  changeListener($event): void {
    this.file = $event.target.files[0];
  }

}
