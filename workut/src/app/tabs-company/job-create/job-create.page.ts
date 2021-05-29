import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.page.html',
  styleUrls: ['./job-create.page.scss'],
})

export class JobCreatePage implements OnInit {

  public addmore: FormGroup;
  jobTitle: string; jobDescription: string;
  salary: string; startDate: string;
  countries: any; states: any;
  country: string; state: string;
  createdTime: string; skillsRequired: any;
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
          this.listInitialValues();
          this.bindCountryList();
          this.bindStateList();
        } else {
          this.authService.Logout();
        }
      });
    });
    this.addmore = this.fBuilder.group({
      skill: [''],
      itemRows: this.fBuilder.array([this.initItemRows()])
    });

    this.deleteRow(0);
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
      if (this.country === 'Brazil') {
        this.states = response;
      }
    });
  }

  listInitialValues() {
    this.country = 'Any country';
    this.state = 'Any state';
  }

  countrySelected() {

    // Verify if the selected country is Brazil
    // and update the States list with all the brazilian states
    if (this.country === 'Brazil') {
      this.bindStateList();
    }

    // Verify if isn't Brazil
    // and update the States list with the 'Outros' option
    else {
      this.states = [];
      if (this.state !== 'Other' && this.state !== 'Any state') {
        this.state = 'Any state';
      }
    }

  }

  saveChanges() {

    this.skillsRequired = this.addmore.value.itemRows;
    this.startDate = new Date().toDateString();

    const body = {
      company: this.body,
      job: {
        company: this.body.ID,
        jobTitle: this.jobTitle,
        jobDescription: this.jobDescription,
        salary: this.salary,
        startDate: this.startDate,
        country: this.country,
        state: this.state,
        skillsRequired: this.skillsRequired
      }
    };

    this.db.CreateJob(body).then(response => {
      if (response === '200') {
        this.createdTime = new Date().toLocaleTimeString();
        this.statusAlert('Successo', 'Vaga criada com sucesso');
        this.navigationRouter.navigate(['/tabs-company/jobs-management', { updated: this.createdTime }]);
      } else if (response === '404') {
        this.authService.Logout();
      } else {
        this.statusAlert('Erro', 'Erro durante a criação... por favor, tente novamente mais tarde.');
      }
    },
      (error) => {
        this.statusAlert('Erro', 'Ocorreu um erro. Por favor, tente novamente!');
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
