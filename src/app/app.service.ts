import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API} from './shared/constants/app.constants';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  authenticated = false;

  public username: string;
  public password: string;
  public currentUser: Observable<any>;
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  private currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
  }

  authenticate(credentials) {
    const headers = new HttpHeaders({
      Authorization: this.createBasicAuthToken(credentials.username, credentials.password)
    });


    return this.http.get(API + '/user', {headers}).pipe(map((res) => {
      if (res['name']) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
      this.username = credentials.username;
      this.password = credentials.password;
      this.registerSuccessfulLogin(credentials.username, credentials.password);
    }));
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) {
      return false;
    }
    return true;
  }

  logout() {
    // remove user from local storage and set current user to null

    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = null;
    this.password = null;
    this.authenticated = false;
  }


}
