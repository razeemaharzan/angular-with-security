import {Injectable} from '@angular/core';
import {API} from '../shared/constants/app.constants';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  public getAllUsers(): Observable<any> {
    return this.http.get(API + '/resource');
  }
}
