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
    this.getCountries();
    this.getStates();
  }

  countries: any;
  states: any;

  user = {
    email: "testando@testando.com",
    password: "testando",
  };

  data: any;
  email: string;
  name: string;
  lastname: string;
  country: String;
  state: String;

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
            this.country = this.data.country; 
            this.state = this.data.state;
          }
          
        },
        (error) => {
          console.log(error);
        }
      );
  }

  countrySelected(){ 
    if(this.country == "Brasil"){
      this.getStates();
    }else{
      if(this.state != "Other" || this.state != "Any state"){
        this.states = [];
        this.state = "Other";
      }
    }
  }

  getCountries() {
    this.httpClient
      .get(
        "https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/getCountries"
      )
      .subscribe(
        (response) => {
         this.countries = response;          
        },
        (error) => {
          console.log(error);
        }
      );
  }

   getStates() {
    this.httpClient
      .get(
        "https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/getStates"
      )
      .subscribe(
        (response) => {
         this.states = response;          
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
