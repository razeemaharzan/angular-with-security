import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {username: '', password: ''};

  constructor(private app: AppService, private http: HttpClient, private router: Router) {
  }

  login() {
    this.app.authenticate(this.credentials).subscribe(value =>
      this.router.navigateByUrl('/')
    );
    return false;
  }

}
