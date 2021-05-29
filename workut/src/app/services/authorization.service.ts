import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private router: Router, private storage: Storage) { }

  setCurrentLogin(paramTOKEN: string, paramID: string, paramtype: string, paramPremium: boolean): any {
    return this.getCurrentLogin().then(session => {

      let _TOKEN = paramTOKEN;
      let _ID = paramID;
      let _type = paramtype;
      let _premium = paramPremium;

      if (session != null) {
        _TOKEN = paramTOKEN != null ? paramTOKEN : session.TOKEN;
        _ID = paramID != null ? paramID : session.ID;
        _type = paramtype != null ? paramtype : session.type;
        _premium = paramPremium != false ? paramPremium : session.premium;
      }

      this.storage.set('session', {
        'TOKEN': _TOKEN,
        'ID': _ID,
        'type': _type,
        'premium': _premium
      });
    });
  }

  Logout() {
    this.storage.remove('session').then(() => {
      location.reload();
    });
  }

  RedirectToLogin() {
    this.storage.remove('session').then(() => {
      this.router.navigate(['/login']);
    });
  }

  getCurrentLogin(): any {
    return this.storage.get('session').then(session => {
      return session;
    });
  }

  isLogged(): any {
    return this.storage.get('session').then(session => {
      if (session === null) {
        return false;
      } else {
        return true;
      }
    });
  }

  AutoLogin(): any {
    return this.storage.get('session').then(session => {
      if (session == null) {
        return 'cancel';
      } else {
        if (session.type === '1') {
          return '/tabs-user';
        } else if (session.type === '2') {
          return '/tabs-company';
        } else if (session.type === '3') {
          return '/tabs-admin';
        } else {
          return 'cancel';
        }
      }
    });
  }

  verifySession(currentPageType: string): any {
    return this.storage.get('session').then(session => {
      return this.isLogged().then(islogged => {
        if (islogged) {
          if (currentPageType !== session.type) {
            return this.AutoLogin();
          }
          else {
            return 'cancel';
          }
        } else {
          this.RedirectToLogin();
        }
      });
    });
  }

}
