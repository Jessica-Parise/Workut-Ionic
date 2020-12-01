import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonSlides, ToastController } from '@ionic/angular';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { DbService } from 'src/app/services/db.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public works: FormGroup;
  public educations: FormGroup;
  public skills: FormGroup;

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
  formDisabled: boolean;

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
  oldName: string;

  workHistory: any;
  educationHistory: any;
  userSkills: any;

  constructor(
    public httpClient: HttpClient, public toastController: ToastController,
    private authService: AuthorizationService, private db: DbService, private fBuilder: FormBuilder) { }

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

    this.works = this.fBuilder.group({
      item: [''],
      itemRows: this.fBuilder.array([this.initItemRows()])
    });

    this.educations = this.fBuilder.group({
      item: [''],
      itemRows: this.fBuilder.array([this.initItemRows()])
    });

    this.skills = this.fBuilder.group({
      item: [''],
      itemRows: this.fBuilder.array([this.initItemRows()])
    });

    this.work.removeAt(0);
    this.education.removeAt(0);
    this.skill.removeAt(0);

  }

  initItemRows() {
    return this.fBuilder.group({
      item: ['']
    });
  }


  // WORK - Dinamic Field
  get work() {
    return this.works.get('itemRows') as FormArray;
  }

  addWork() {
    if (this.formDisabled === false) { this.work.push(this.initItemRows()); }
  }

  search_initWork(value: string) {
    return this.fBuilder.group({
      item: [value]
    });
  }

  search_addWork(value: string) {
    this.work.push(this.search_initWork(value));
  }

  deleteWork(index: number) {
    if (this.formDisabled === false) { this.work.removeAt(index); }
  }

  // EDUCATION - Dinamic Field
  get education() {
    return this.educations.get('itemRows') as FormArray;
  }

  addEducation() {
    if (this.formDisabled === false) { this.education.push(this.initItemRows()); }
  }

  search_initEducation(value: string) {
    return this.fBuilder.group({
      item: [value]
    });
  }

  search_addEducation(value: string) {
    this.education.push(this.search_initEducation(value));
  }

  deleteEducation(index: number) {
    if (this.formDisabled === false) { this.education.removeAt(index); }
  }

  // SKILL - Dinamic Field
  get skill() {
    return this.skills.get('itemRows') as FormArray;
  }

  addSkill() {
    if (this.formDisabled === false) { this.skill.push(this.initItemRows()); }
  }

  search_initSkill(value: string) {
    return this.fBuilder.group({
      item: [value]
    });
  }

  search_addSkill(value: string) {
    this.skill.push(this.search_initSkill(value));
  }

  deleteSkill(index: number) {
    if (this.formDisabled === false) { this.skill.removeAt(index); }
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
    this.db.UserListProfile(this.body).then(response => {
      if (response === '404') {
        this.authService.Logout();
      } else {
        this.data = response;
        this.email = this.data.email;
        this.name = this.data.name;
        this.lastname = this.data.lastName;
        this.country = this.data.country;
        this.state = this.data.state;
        this.birth = this.data.curriculum.birth;
        this.gender = this.data.curriculum.gender;
        this.phone = this.data.curriculum.phone;
        this.mstatus = this.data.curriculum.mstatus;
        this.portfolio = this.data.curriculum.portfolio;
        this.careergoal = this.data.curriculum.careergoal;
        this.salary = this.data.curriculum.salary;
        this.xplvl = this.data.curriculum.xplvl;
        this.schooling = this.data.curriculum.schooling;
        this.oldName = this.name;

        this.work.removeAt(0);
        if (response.curriculum.workHistory[0] != undefined && response.curriculum.workHistory[0] != null) {
          this.work.removeAt(0);
          response.curriculum.workHistory.forEach(x => {
            this.search_addWork(x.item);
          });
        }

        this.education.removeAt(0);
        if (response.curriculum.educationHistory[0] != undefined && response.curriculum.educationHistory[0] != null) {
          this.education.removeAt(0);
          response.curriculum.educationHistory.forEach(x => {
            this.search_addEducation(x.item);
          });
        }

        this.skill.removeAt(0);
        if (response.curriculum.userSkills[0] != undefined && response.curriculum.userSkills[0] != null) {
          this.skill.removeAt(0);
          response.curriculum.userSkills.forEach(x => {
            this.search_addSkill(x.item);
          });
        }

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
    this.formDisabled = status;
  }

  update() {

    this.workHistory = this.works.value.itemRows;
    this.educationHistory = this.educations.value.itemRows;
    this.userSkills = this.skills.value.itemRows;
    const birthConfigured = this.birth.substring(0, 10);

    const body = {
      user: this.body,
      newData: {
        email: this.email,
        name: this.name,
        lastName: this.lastname,
        country: this.country,
        state: this.state,
        birth: birthConfigured,
        gender: this.gender,
        phone: this.phone,
        mstatus: this.mstatus,
        portfolio: this.portfolio,
        careergoal: this.careergoal,
        salary: this.salary,
        xplvl: this.xplvl,
        schooling: this.schooling,
        workHistory: this.workHistory,
        educationHistory: this.educationHistory,
        userSkills: this.userSkills,
      },
    };

    this.db.UserUpdateProfile(body).then(response => {
      if (response === '200') {
        this.statusAlert('Success', 'Profile data has been updated successfully!');
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
  }

  async statusAlert(title, message) {
    const alert = await this.toastController.create({
      header: title,
      message: message,
      duration: 1500
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
