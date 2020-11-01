import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private router: Router) { }

  setCurrentLogin(Email: string, TOKEN: string, ID: string, type: string) {
    if (Email != null) { localStorage.setItem('loggedEmail', Email); }
    if (TOKEN != null) { localStorage.setItem('loggedTOKEN', TOKEN); }
    if (ID != null) { localStorage.setItem('loggedID', ID); }
    if (type != null) { localStorage.setItem('type', type); }
  }

  getCurrentLogin() {
    return {
      email: localStorage.getItem('loggedEmail'),
      TOKEN: localStorage.getItem('loggedTOKEN'),
      ID: localStorage.getItem('loggedID'),
      type: localStorage.getItem('type')
    }
  }

  Logout() {
    localStorage.removeItem('loggedEmail');
    localStorage.removeItem('loggedTOKEN');
    localStorage.removeItem('loggedID');
    localStorage.removeItem('type');
    this.router.navigate(['/login']);
  }

  isLogged() {
    const email = localStorage.getItem('loggedEmail');
    const TOKEN = localStorage.getItem('loggedTOKEN');
    const ID = localStorage.getItem('loggedID');
    const type = localStorage.getItem('type');
    if (email == null || TOKEN == null || ID == null || type == null) {
      return false;
    } else {
      return true;
    }
  }

  AutoLogin() {
    if (localStorage.getItem('type') === '1') {
      this.router.navigate(['/tabs-user']);
    } else {
      this.router.navigate(['/tabs-company']);
    }
  }

  verifySession(currentPageType: string) {

    const currentUserType = this.getCurrentLogin().type;

    if (this.isLogged()) {

      if (currentPageType !== currentUserType) { this.AutoLogin(); }

    } else {
      this.Logout();
    }

  }

}
