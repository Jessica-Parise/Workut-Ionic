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
  subtitle: string;
  date: string;
  Skills: any;

  constructor(public actRoute: ActivatedRoute, private db: DbService) { }

  ngOnInit() {
    this.actRoute.params.subscribe(params => {
      this.id = params.id;
      this.searchJob();
    });
  }

  searchJob() {
    console.log(this.id);
    this.db.CompanySearchJob(this.id).then(response => {
      console.log(response);
      this.title = response.jobTitle;
      this.description = response.jobDescription;
      this.subtitle = response.salary + ' | ' + response.country + ' | ' + response.state;
      this.date = response.startDate;
      this.Skills = response.skillsRequired;
    });
  }

}
