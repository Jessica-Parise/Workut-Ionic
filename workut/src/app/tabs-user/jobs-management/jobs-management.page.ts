import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-jobs-management',
  templateUrl: './jobs-management.page.html',
  styleUrls: ['./jobs-management.page.scss'],
})
export class JobsManagementPage implements OnInit {

  constructor(private router: Router, private authService: AuthorizationService) { }

  ngOnInit() {
    this.authService.verifySession('1');
  }

}
