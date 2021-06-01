import {Component} from '@angular/core';
import {AppService} from '../app.service';
import {HttpClient} from '@angular/common/http';
import {API} from '../shared/constants/app.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title = 'Demo';
  greeting = {};
  users;

  constructor(private app: AppService, private http: HttpClient) {

    http.get(API + '/resource').subscribe(data => this.greeting = data);
  }

  getUsers() {
    this.http.get(API + '/users').subscribe(data => this.users = data);
  }

  authenticated() {
    return this.app.authenticated;
  }

}
