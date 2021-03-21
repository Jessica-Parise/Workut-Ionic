import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonSlides, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  // MAIN PAGE --------------------------------------------
  // Linking variable 'slides' to the slides in hmtl page
  @ViewChild('slides', { static: true }) slides: IonSlides;
  segment;
  slidePosition;

  // COMPANY DATA PAGE ----------------------------------------
  iconName = 'lock-closed';
  emailDisabled: boolean;
  nameDisabled: boolean; cepDisabled: boolean;
  countryDisabled: boolean; stateDisabled: boolean;

  countries: any;
  states: any;

  Applies;
  body;

  data: any; email: string;
  name: string; cep: string;
  country: string; state: string;

  oldName: string;

  constructor(
    public httpClient: HttpClient, public toastController: ToastController,
    private router: Router, private authService: AuthorizationService, private db: DbService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.authService.verifySession('2').then(() => {
      this.authService.getCurrentLogin().then(LOGIN => {
        if (LOGIN != null) {
          this.body = LOGIN;
          this.search();
          this.getCountries();
          this.getStates();
          this.searchApplies();
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
    this.db.CompanyListProfile(this.body).then((response) => {
      if (response === '404') {
        this.authService.Logout();
      } else {
        this.data = response;
        this.email = this.data.email;
        this.name = this.data.name;
        this.cep = this.data.cep;
        this.country = this.data.country;
        this.state = this.data.state;
        this.oldName = this.name;
      }
    },
      (error) => {
        this.statusAlert('Error', 'An error occurred. Please try again!');
      }
    );
  }

  countrySelected() {
    if (this.country === 'Brazil') {
      this.getStates();
    } else {
      if (this.state !== 'Other' && this.state !== 'Any state') {
        this.states = [];
        this.state = 'Other';
      }
    }
  }

  getCountries() {
    this.db.getCountries().then(response => {
      this.countries = response;
    },
      (error) => {
        this.statusAlert('Error', 'An error occurred. Please try again!');
      }
    );
  }

  getStates() {
    this.db.getStates().then(response => {
      this.states = response;
    },
      (error) => {
        this.statusAlert('Error', 'An error occurred. Please try again!');
      }
    );
  }

  updateControls(status: boolean) {
    this.emailDisabled = status;
    this.nameDisabled = status; this.cepDisabled = status;
    this.countryDisabled = status; this.stateDisabled = status;
  }

  editProfile() {

    if (this.iconName === 'lock-open') {

      const body = {
        company: this.body,
        newData: {
          email: this.email,
          name: this.name,
          cep: this.cep,
          country: this.country,
          state: this.state,
        },
      };

      this.db.CompanyUpdateProfile(body).then(response => {
        if (response === '200') {
          this.statusAlert('Sucess', 'Profile data has been updated successfully!');
          if (this.oldName !== this.name) {
            location.reload();
          }
        } else if (response === '404') {
          this.authService.Logout();
        } else {
          this.statusAlert('Error', 'An error occurred. Please try again!');
        }
      },
        (error) => {
          this.statusAlert('Error', 'An error occurred. Please try again!');
        }
      );
      this.iconName = 'lock-closed';
      this.updateControls(true);
    }
    else {
      this.iconName = 'lock-open';
      this.updateControls(false);
    }
  }

  // Presents an alert for status
  async statusAlert(title, mensagem) {
    const alert = await this.toastController.create({
      header: title,
      message: mensagem,
      duration: 1000
    });

    await alert.present();
  }

  openCV(item) {
    this.router.navigate(['/user-curriculum', { id: item.user }]);
  }

  searchApplies() {
    this.db.CompanyAppliedJobSearch(this.body).then(response => {
      if (response === '404') {
        this.authService.Logout();
      } else {
        this.Applies = response;
        for (let i = 0; i < this.Applies.length; i++) {

          this.db.SearchUser(this.Applies[i].user).then(userFound => {
            if (userFound != null) {
              this.Applies[i].userLastname = userFound.lastName;
              this.Applies[i].userName = userFound.name;
              this.Applies[i].userEmail = userFound.email;

              this.db.SearchJob(this.Applies[i].job).then(jobFound => {
                if (jobFound != null) {
                  this.Applies[i].jobTitle = jobFound.jobTitle;
                } else {
                  this.Applies.splice(i);
                }
              });
            } else {
              this.Applies.splice(i);
            }
          });

        }
      }
    },
      (error) => {
        this.statusAlert('Error', 'An error occurred. Please try again!');
      }
    );
  }

  Decline(item): void {

    const body = {
      company: this.body,
      id: item._id.$oid
    };

    this.db.UserDeleteAppliedJob(body).then(response => {
      if (response === '200') {
        this.search();
      } else if (response === '404') {
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

  Chat(item): void {
    this.db.CreateContact(this.body, item.user).then(response => {
      this.router.navigate(['/tabs-company/chats']);
    });
  }

}

