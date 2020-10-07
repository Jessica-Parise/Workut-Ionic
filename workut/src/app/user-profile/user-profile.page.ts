import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";



@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.page.html",
  styleUrls: ["./user-profile.page.scss"],
})
export class UserProfilePage implements OnInit {
  constructor(public httpClient: HttpClient) {}

  ngOnInit() {
    this.search();
  }

  user = {
    email: "aa",
    password: "a",
  };

  data: any;
  email: string;
  name: string;
  lastname: string;

  search() {
    this.httpClient
      .post(
        "https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/UserListProfile",
        this.user
      )
      .subscribe(
        (response) => {
          if(response == 404){
            console.log('Sessão expirada');
          }else{
            this.data = response;
            this.email = this.data.email;
            this.name = this.data.name;
            this.lastname = this.data.lastname;
          }
          
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
