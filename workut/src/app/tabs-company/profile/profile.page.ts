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

  constructor(public httpClient: HttpClient, public alertController: AlertController) { }

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

  // COMPANY DATA PAGE ----------------------------------------
  iconName = "lock-closed";
  emailDisabled: boolean;
  nameDisabled: boolean; cepDisabled: boolean;
  countryDisabled: boolean; stateDisabled: boolean;

  countries: any;
  states: any;

  company = {
    email: localStorage.getItem('loggedEmail'),
    password: localStorage.getItem('loggedPassword'),
  };

  data: any; email: string;
  name: string; cep: string;
  country: String; state: String;

  search() {
    this.httpClient
      .post(
        "https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/CompanyListProfile",
        this.company
      )
      .subscribe(
        (response) => {
          if (response == 404) {
            this.statusAlert('Erro', 'An error occurred. Please try again!');
          } else {
            this.data = response;
            this.email = this.data.email;
            this.name = this.data.name;
            this.cep = this.data.cep;
            this.country = this.data.country;
            this.state = this.data.state;
          }
        },
        (error) => {
          this.statusAlert('Erro', 'An error occurred. Please try again!');
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
          this.statusAlert('Erro', 'An error occurred. Please try again!');
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
          this.statusAlert('Erro', 'An error occurred. Please try again!');
        }
      );
  }

  updateControls(status: boolean) {
    this.emailDisabled = status;
    this.nameDisabled = status; this.cepDisabled = status;
    this.countryDisabled = status; this.stateDisabled = status;
  }

  editProfile() {

    if (this.iconName == "lock-open") {

      const body = {
        company: {
          email: localStorage.getItem('loggedEmail'),
          password: localStorage.getItem('loggedPassword'),
        },
        newData: {
          email: this.email,
          name: this.name,
          cep: this.cep,
          country: this.country,
          state: this.state,
        },
      };

      this.httpClient
        .post(
          "https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/CompanyEditProfile",
          body
        )
        .subscribe(
          (response) => {
            if (response == "200") {
              this.statusAlert('Sucess', 'Profile data has been updated successfully!');
              localStorage.setItem('loggedEmail', this.email);
            } else if (response == "404") {
              this.statusAlert('Erro', 'An error occurred. Please try again!');
            } else {
              this.statusAlert('Erro', 'An error occurred. Please try again!');
            }
          },
          (error) => {
            this.statusAlert('Erro', 'An error occurred. Please try again!');
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

  async statusAlert(title, message) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
