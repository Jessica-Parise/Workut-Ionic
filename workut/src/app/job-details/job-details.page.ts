
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.page.html',
  styleUrls: ['./job-details.page.scss'],
})
export class JobDetailsPage implements OnInit {

  id: string;

  title: string;
  description: string;
  salary: string;
  country: string;
  state: string;
  date: string;
  Skills: any;
  companyName: string;
  companyEmail: string;
  companyImg: string;

  constructor(public actRoute: ActivatedRoute, private db: DbService) { }

  ngOnInit() {
    this.actRoute.params.subscribe(params => {
      this.id = params.id;
      this.searchJob();
    });
  }

  searchJob() {
    this.db.SearchJob(this.id).then(response => {

      this.db.SearchCompany(response.company).then(companyFound => {

        this.title = response.jobTitle;
        this.description = response.jobDescription;
        this.salary = response.salary;
        this.country = response.country;
        this.state = response.state;
        this.date = response.startDate;
        this.companyName = companyFound.name;
        this.companyEmail = companyFound.email;
        this.companyImg = companyFound.img;

        if (response.skillsRequired[0].skill == null) {
          this.Skills = null;
        } else {
          this.Skills = response.skillsRequired;
        }

      });

    });
  }

}
