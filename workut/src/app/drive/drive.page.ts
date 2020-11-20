import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drive',
  templateUrl: './drive.page.html',
  styleUrls: ['./drive.page.scss'],
})
export class DrivePage implements OnInit {

  image = '';
  file: File;
  imageID;

  constructor(public http: HttpClient) { }

  ngOnInit() { }

  changeListener($event): void {
    this.file = $event.target.files[0];
    if (this.file != null && this.file != undefined) {
      this.uploadImage();
    } else {
      console.log(this.file);
    }
  }

  uploadImage(): any {
    this.http.post
      ('https://oauth2.googleapis.com/token?client_id=341219202511-kek2v3i97fduh76q2uta7u0in81j980v.apps.googleusercontent.com&client_secret=T64kW0ldvlcNU-QHoSVEB3BL&grant_type=refresh_token&refresh_token=1//0hPCJufXauyYWCgYIARAAGBESNwF-L9Irhsoye747NrG1slEFUQz6-aaYEjjJC6wuedyhT1M3tW6EAjwN7ueurGtPqs89Wl0bvzY', null)
      .subscribe((token: any) => {
        const header = new HttpHeaders().set('Authorization', 'Bearer ' + token.access_token);
        this.http.post
          ('https://www.googleapis.com/upload/drive/v3/files', this.file, { headers: header })
          .subscribe((x: any) => {
            this.imageID = x.id;
            this.publicImageAndLoad();
          });
      });
  }

  publicImageAndLoad(): any {
    this.http.post
      ('https://oauth2.googleapis.com/token?client_id=341219202511-kek2v3i97fduh76q2uta7u0in81j980v.apps.googleusercontent.com&client_secret=T64kW0ldvlcNU-QHoSVEB3BL&grant_type=refresh_token&refresh_token=1//0hPCJufXauyYWCgYIARAAGBESNwF-L9Irhsoye747NrG1slEFUQz6-aaYEjjJC6wuedyhT1M3tW6EAjwN7ueurGtPqs89Wl0bvzY', null)
      .subscribe((token: any) => {
        const header = new HttpHeaders().set('Authorization', 'Bearer ' + token.access_token);
        this.http.post
          (
            'https://www.googleapis.com/drive/v3/files/' + this.imageID + '/copy',
            {
              name: this.imageID,
              parents: ['1u-fe-zdH-RuAo-fmN_-1CFMYAHb4JamH']
            },
            {
              headers: header
            }
          )
          .subscribe((x: any) => {
            this.imageID = x.id;
            this.image = 'https://drive.google.com/uc?id=' + this.imageID;
          });
      });
  }

}
