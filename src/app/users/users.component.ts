import {Component, OnInit} from '@angular/core';
import {UsersService} from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {

  users: any;

  constructor(service: UsersService) {
    service.getAllUsers().subscribe(value =>
      this.users = value
    );
  }

  ngOnInit() {

  }

}
