import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonSlides } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  // MAIN PAGE --------------------------------------------
  // Linking variable 'slides' to the slides in hmtl page
  @ViewChild('slides', { static: true }) slides: IonSlides;
  segment: any;
  slidePosition: any;

  // USER DATA PAGE ----------------------------------------
  iconName = 'lock-closed';
  iconName_CV = 'lock-closed';
  emailDisabled: boolean;
  nameDisabled: boolean; lastnameDisabled: boolean;
  countryDisabled: boolean; stateDisabled: boolean;
  birthDisabled: boolean;
  genderDisabled: boolean; phoneDisabled: boolean;
  mstatusDisabled: boolean; portfolioDisabled: boolean;
  careergoalDisabled: boolean; salaryDisabled: boolean;
  xplvlDisabled: boolean; schoolingDisabled: boolean;

  countries: any;
  states: any;

  body = this.authService.getCurrentLogin();

  data: any; email: string;
  name: string; lastname: string;
  country: string; state: string;
  birth: string;
  gender: string; phone: string;
  mstatus: string; portfolio: string;
  careergoal: string; salary: string;
  xplvl: string; schooling: string;

  constructor(
    public httpClient: HttpClient, public alertController: AlertController,
    private authService: AuthorizationService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.authService.verifySession('1').then(() => {
      this.authService.getCurrentLogin().then(LOGIN => {
        if (LOGIN != null) {
          this.body = LOGIN;
          this.search();
          this.getCountries();
          this.getStates();
        } else {
          this.authService.Logout();
        }
      });
    });
  }

  segmentChanged(ev: any) {
    this.slides.slideTo(ev.detail.value);
  }

  async slidesChanged(slides: IonSlides) {
    slides.getActiveIndex().then(index => {
      this.slidePosition = index;
      this.segment = this.slidePosition;
    });
  }

  search() {
    this.httpClient
      .post(
        'https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/UserListProfile',
        this.body
      ).subscribe(
        (response) => {
          if (response == 404) {
            this.authService.Logout();
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
          this.statusAlert('Error', 'An error occurred. Please try again!');
        }
      );
  }

  countrySelected() {
    if (this.country == 'Brazil') {
      this.getStates();
    } else {
      if (this.state != 'Other' && this.state != 'Any state') {
        this.states = [];
        this.state = 'Other';
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
          this.statusAlert('Error', 'An error occurred. Please try again!');
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
          this.statusAlert('Error', 'An error occurred. Please try again!');
        }
      );
  }

  updateControls(status: boolean) {
    this.emailDisabled = status;
    this.nameDisabled = status; this.lastnameDisabled = status;
    this.countryDisabled = status; this.stateDisabled = status;
  }

  updateControls_CV(status: boolean) {
    this.birthDisabled = status;
    this.genderDisabled = status;
    this.phoneDisabled = status;
    this.mstatusDisabled = status;
    this.portfolioDisabled = status;
    this.careergoalDisabled = status;
    this.salaryDisabled = status;
    this.xplvlDisabled = status;
    this.schoolingDisabled = status;
  }

  update() {

    const body = {
      user: this.body,
      newData: {
        email: this.email,
        name: this.name,
        lastName: this.lastname,
        country: this.country,
        state: this.state,
        birth: this.birth,
        gender: this.gender, 
        phone: this.phone,
        mstatus: this.mstatus, 
        portfolio: this.portfolio,
        careergoal: this.careergoal, 
        salary: this.salary,
        xplvl: this.xplvl,
        schooling: this.schooling,

      },
    };

    this.httpClient
      .post(
        'https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook/UserEditProfile',
        body
      )
      .subscribe(
        (response) => {
          if (response == "200") {
            this.statusAlert('Success', 'Profile data has been updated successfully!');
          } else if (response == "404") {
            this.authService.Logout();
          } else {
            this.statusAlert('Error', 'An error occurred. Please try again!');
          }
        },
        (error) => {
          this.statusAlert('Error', 'An error occurred. Please try again!');
        }
      );

  
  }

  async statusAlert(title, message) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  editProfile() {

    if (this.iconName == "lock-open") {
      this.update();
      this.iconName = "lock-closed";
      this.updateControls(true);
    }
    else {
      this.iconName = "lock-open";
      this.updateControls(false);
    }
  }

  editCV() {
    if (this.iconName_CV == "lock-open") {
      this.update();
      this.iconName_CV = "lock-closed";
      this.updateControls_CV(true);
    } 
    else {
      this.iconName_CV = "lock-open";
      this.updateControls_CV(false);
    }

  }

}
