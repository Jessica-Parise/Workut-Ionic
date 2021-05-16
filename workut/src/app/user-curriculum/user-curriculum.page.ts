import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../services/db.service';
@Component({
  selector: 'app-user-curriculum',
  templateUrl: './user-curriculum.page.html',
  styleUrls: ['./user-curriculum.page.scss'],
})
export class UserCurriculumPage implements OnInit {

  id: string;

  name: string;
  email: string;
  birth: string;
  gender: string;
  phone: string;
  mstatus: string;
  portifolio: string;
  careergoal: string;
  salary: string;
  xplvl: string;
  schooling: string;
  Work: any;
  Education: any;
  Skills: any;
  userImg: string;


  constructor(public actRoute: ActivatedRoute, private db: DbService) { }

  ngOnInit() {
    this.actRoute.params.subscribe(params => {
      this.id = params.id;
      this.searchCV();
    });
  }

  searchCV() {
    this.db.SearchCV(this.id).then(response => {
      this.name = response.name;
      this.email = response.email;
      this.userImg = response.img;
      this.birth = response.birth;
      this.gender = response.gender;
      this.phone = response.phone;
      this.mstatus = response.mstatus;
      this.portifolio = response.portifolio;
      this.careergoal = response.careergoal;
      this.salary = response.salary;
      this.xplvl = response.xplvl;
      this.schooling = response.schooling;

      if (response.workHistory[0] == null) {
        this.Work = null;
      } else {
        this.Work = response.workHistory;
      }
      if (response.educationHistory[0] == null) {
        this.Education = null;
      } else {
        this.Education = response.educationHistory;
      }
      if (response.userSkills[0] == null) {
        this.Skills = null;
      } else {
        this.Skills = response.userSkills;
      }
    });
  }

}