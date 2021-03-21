import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private API = 'https://webhooks.mongodb-realm.com/api/client/v2.0/app/workut-nbyci/service/API/incoming_webhook';

  constructor(public http: HttpClient) { }

  public Login(user: any): Promise<any> {
    return this.http.post(
      this.API + '/Login', user
    ).toPromise();
  }

  public getCountries(): Promise<any> {
    return this.http.get(
      this.API + '/getCountries'
    ).toPromise();
  }

  public getStates(): Promise<any> {
    return this.http.get(
      this.API + '/getStates'
    ).toPromise();
  }

  public CompanySingUp(company: any): Promise<any> {
    return this.http.post(
      this.API + '/CompanySignUp', company
    ).toPromise();
  }

  public UserSingUp(user: any): Promise<any> {
    return this.http.post(
      this.API + '/UserSignUp', user
    ).toPromise();
  }

  public CompanyListProfile(session: any): Promise<any> {
    return this.http.post(
      this.API + '/CompanyListProfile', session
    ).toPromise();
  }

  public UserListProfile(session: any): Promise<any> {
    return this.http.post(
      this.API + '/UserListProfile', session
    ).toPromise();
  }

  public UserUpdateProfile(currentUser: any): Promise<any> {
    return this.http.post(
      this.API + '/UserEditProfile', currentUser
    ).toPromise();
  }

  public CompanyUpdateProfile(currentCompany: any): Promise<any> {
    return this.http.post(
      this.API + '/CompanyEditProfile', currentCompany
    ).toPromise();
  }

  public ListJobs(session: any): Promise<any> {
    return this.http.post(
      this.API + '/listJobs', session
    ).toPromise();
  }

  public ListUsers(session: any): Promise<any> {
    return this.http.post(
      this.API + '/ListadeUsuarios', session
    ).toPromise();
  }

  public SearchJobs(search: string, session: any): Promise<any> {
    return this.http.post(
      this.API + '/UserJobsSearch_Title?search=' + search, session
    ).toPromise();
  }

  public SearchUsers(search: string, session: any): Promise<any> {
    return this.http.post(
      this.API + '/CompanyUsersSearch_Country?search=' + search, session
    ).toPromise();
  }

  public CreateJob(job: any): Promise<any> {
    return this.http.post(
      this.API + '/CompanyJobsInsert', job
    ).toPromise();
  }

  public SearchJob(id: string): Promise<any> {
    return this.http.get(
      this.API + '/getJob?id=' + id
    ).toPromise();
  }
  public SearchCV(id: string): Promise<any> {
    return this.http.get(
      this.API + '/getUserCV?id=' + id
    ).toPromise();
  }
  public SearchUser(id: string): Promise<any> {
    return this.http.get(
      this.API + '/getUser?id=' + id
    ).toPromise();
  }

  public SearchCompany(id: string): Promise<any> {
    return this.http.get(
      this.API + '/getCompany?id=' + id
    ).toPromise();
  }

  public EditJob(job: any): Promise<any> {
    return this.http.post(
      this.API + '/CompanyJobsEdit', job
    ).toPromise();
  }

  public DeleteJob(body: any): Promise<any> {
    return this.http.post(
      this.API + '/CompanyJobsDelete', body
    ).toPromise();
  }

  public UserDeleteAppliedJob(body: any): Promise<any> {
    return this.http.post(
      this.API + '/UserAppliedJobsDelete', body
    ).toPromise();
  }

  public CompanyListJobs(body: any): Promise<any> {
    return this.http.post(
      this.API + '/CompanyJobsSearch', body
    ).toPromise();
  }

  public UserAppliedJobsSearch(body: any): Promise<any> {
    return this.http.post(
      this.API + '/UserAppliedJobsSearch', body
    ).toPromise();
  }

  public CompanySearchJobs(search: string, body: any): Promise<any> {
    return this.http.post(
      this.API + '/CompanyJobsSearch_Title?search=' + search, body
    ).toPromise();
  }

  public UserAppliedJobSearch(search: string, body: any): Promise<any> {
    return this.http.post(
      this.API + '/UserAppliedJobsSearch_Title?search=' + search, body
    ).toPromise();
  }

  public CompanyAppliedJobSearch(body: any): Promise<any> {
    return this.http.post(
      this.API + '/CompanyAppliedJobsSearch', body
    ).toPromise();
  }

  public UserApplyForJob(body: any): Promise<any> {
    return this.http.post(
      this.API + '/UserApplyForJob', body
    ).toPromise();
  }

  public verifyAppliedStatus(user: string, job: string): Promise<any> {
    return this.http.get(
      this.API + '/verifyAppliedStatus?user=' + user + '&job=' + job
    ).toPromise();
  }

  public getSentContacts(LOGIN: any): Promise<any> {
    return this.http.post(
      this.API + '/getSentContacts', { ID: LOGIN.ID, TOKEN: LOGIN.TOKEN }
    ).toPromise();
  }

  public getReceivedContacts(LOGIN: any): Promise<any> {
    return this.http.post(
      this.API + '/getReceivedContacts', { ID: LOGIN.ID, TOKEN: LOGIN.TOKEN }
    ).toPromise();
  }

  public getSomeone(ID: string): Promise<any> {
    return this.http.get(
      this.API + '/getSomeone?id=' + ID
    ).toPromise();
  }

  public postChatMessage(LOGIN: any, idContact: string, message: string, contactType: string): Promise<any> {
    return this.http.post(
      this.API + '/postChatMessage', { ID: LOGIN.ID, TOKEN: LOGIN.TOKEN, idContact, message, contactType }
    ).toPromise();
  }

  public getChatMessagesHistory(LOGIN: any, idContact: string, contactType: string): Promise<any> {
    return this.http.post(
      this.API + '/getChatMessagesHistory', { ID: LOGIN.ID, TOKEN: LOGIN.TOKEN, idContact, contactType }
    ).toPromise();
  }

  public CreateContact(LOGIN: any, user2: string): Promise<any> {
    return this.http.post(
      this.API + '/CreateContact', { TOKEN: LOGIN.TOKEN, user1: LOGIN.ID, user2 }
    ).toPromise();
  }

  public CompanyDeleteAppliedJob(body: any): Promise<any> {
    return this.http.post(
      this.API + '/UserAppliedJobsDelete', body
    ).toPromise();
  }

}

