import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonSlides } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public httpClient: HttpClient) { }

  ngOnInit() {
    this.search();
    this.getCountries();
    this.getStates();
  }

  // MAIN PAGE --------------------------------------------
  // Linking variable 'slides' to the slides in hmtl page
  @ViewChild('slides', { static: true }) slides: IonSlides;
  segment;
  slidePosition;



  segmentChanged(ev: any) {
    this.slides.slideTo(ev.detail.value);
  }

  async slidesChanged(slides: IonSlides) {
    slides.getActiveIndex().then(index => {
      this.slidePosition = index;
      this.segment = this.slidePosition;
    });
  }

  // USER DATA PAGE ----------------------------------------
  iconName = "lock-closed";
  emailDisabled: boolean;
  nameDisabled: boolean; lastnameDisabled: boolean;
  countryDisabled: boolean; stateDisabled: boolean;

  countries: any;
  states: any;

  user = {
    email: "mateus@workut.com",
    password: "senha",
  };

  data: any; email: string;
  name: string; lastname: string;
  country: String; state: String;

  search() {
    this.httpClient
      .post(
        "https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/UserListProfile",
        this.user
      )
      .subscribe(
        (response) => {
          if (response == 404) {
            console.log("Sessão expirada");
          } else {
            this.data = response;
            this.email = this.data.email;
            this.name = this.data.name;
            this.lastname = this.data.lastName;
            this.country = this.data.country;
            this.state = this.data.state;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  countrySelected() {
    if (this.country == "Brazil") {
      this.getStates();
    } else {
      if (this.state != "Other" || this.state != "Any state") {
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

  updateControls(status: boolean) {
    this.emailDisabled = status;
    this.nameDisabled = status; this.lastnameDisabled = status;
    this.countryDisabled = status; this.stateDisabled = status;
  }

  editProfile() {

    if (this.iconName == "lock-open") {

      const body = {
        user: {
          email: "mateus@workut.com",
          password: "senha",
        },
        newData: {
          email: this.email,
          name: this.name,
          lastName: this.lastname,
          country: this.country,
          state: this.state,
        },
      };

      this.httpClient
        .post(
          "https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/UserEditProfile",
          body
        )
        .subscribe(
          (response) => {
            if (response == "200") {
              console.log("Sucesso");
            } else if (response == "404") {
              console.log("Seesão Expirada");
            } else {
              console.log("Error");
            }
          },
          (error) => {
            console.log(error);
          }
        );

      this.iconName = "lock-closed";
      this.updateControls(true);
    }
    else {
      this.iconName = "lock-open";
      this.updateControls(false);
    }
  }

}
