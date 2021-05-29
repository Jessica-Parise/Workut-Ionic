import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.page.html',
  styleUrls: ['./job-edit.page.scss'],
})

export class JobEditPage implements OnInit {

  public addmore: FormGroup;
  id: string; job: any;
  jobTitle: string; jobDescription: string; salary: string;
  countries: any; states: any;
  country: string; state: string;
  updateTime: string;
  body;

  constructor(
    public http: HttpClient, private router: ActivatedRoute,
    private navigationRouter: Router, public toastController: ToastController,
    private fBuilder: FormBuilder, private authService: AuthorizationService, private db: DbService) { }

  ngOnInit() {
    this.authService.verifySession('2').then(() => {
      this.authService.getCurrentLogin().then(LOGIN => {
        if (LOGIN != null) {
          this.body = LOGIN;

          this.router.params.subscribe(params => {
            this.id = params['id'];
          });
          this.bindCountryList();
        } else {
          this.authService.Logout();
        }
      });
    });
    this.addmore = this.fBuilder.group({
      skill: [''],
      itemRows: this.fBuilder.array([this.initItemRows()])
    });
  }

  get formArr() {
    return this.addmore.get('itemRows') as FormArray;
  }

  initItemRows() {
    return this.fBuilder.group({
      skill: ['']
    });
  }

  addNewRow() {
    this.formArr.push(this.initItemRows());
  }

  search_initItemRows(value: string) {
    return this.fBuilder.group({
      skill: [value]
    });
  }

  search_addNewRow(value: string) {
    this.formArr.push(this.search_initItemRows(value));
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  bindCountryList() {
    // Searching the Countries
    this.db.getCountries().then(response => {
      this.countries = response;
      this.bindStateList();
    });
  }

  bindStateList() {
    // Searching the States
    this.db.getStates().then(response => {
      this.states = response;
      if (this.state == null) {
        this.searchData();
      }
    });
  }

  searchData() {
    this.db.SearchJob(this.id).then(response => {
      if (response === '404') {
        this.authService.Logout();
      } else {
        this.job = response;
        this.jobTitle = response.jobTitle;
        this.jobDescription = response.jobDescription;
        this.salary = response.salary;
        this.country = response.country;
        if (response.country !== 'Brazil') {
          this.states = [];
          this.state = response.state;
        } else {
          this.state = response.state;
        }

        // Removes the first row because its always be empty
        this.deleteRow(0);
        if (response.skillsRequired != undefined && response.skillsRequired != null) {
          this.deleteRow(0);
          response.skillsRequired.forEach(item => {
            this.search_addNewRow(item.skill);
          });
        }
      }

    });
  }

  countrySelected() {

    // Verify if the selected country is Brazil
    // and update the States list with all the brazilian states
    if (this.country == 'Brazil') {
      this.bindStateList();
    }

    else {
      this.states = [];
      if (this.state != 'Other' && this.state != 'Any state') {
        this.state = 'Any state';
      }
    }

  }

  saveChanges() {

    const body = {
      company: this.body,
      job: {
        id: this.id,
        jobTitle: this.jobTitle,
        jobDescription: this.jobDescription,
        salary: this.salary,
        country: this.country,
        state: this.state,
        skillsRequired: this.addmore.value.itemRows
      }
    };

    this.db.EditJob(body).then(response => {
      if (response === '200') {
        this.updateTime = new Date().toLocaleTimeString();
        this.statusAlert('Successo', 'Os dados da vaga foram atualizados com sucesso!');
        this.navigationRouter.navigate(['/tabs-company/jobs-management', { updated: this.updateTime }]);
      } else if (response === '404') {
        this.authService.Logout();
      } else {
        this.statusAlert('Erro', 'Um erro ocorreu. Tente novamente mais tarde!');
      }
    },
      (error) => {
        this.statusAlert('Erro', 'Um erro ocorreu. Tente novamente mais tarde!');
      }
    );

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

}