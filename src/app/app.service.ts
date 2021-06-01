import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API} from './shared/constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  authenticated = false;


  constructor(private http: HttpClient) {
  }

  authenticate(credentials, callback) {

    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('java' + ':' + 'java')
    });

    this.http.get(API + '/user', {headers}).subscribe(response => {
      if (response['name']) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
      return callback && callback();
    });

  }

}
