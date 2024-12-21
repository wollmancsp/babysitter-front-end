import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../login-request-class/login-request';
import { User } from '../../user/model/user';
import { Observable } from 'rxjs';
import {SERVER_HOST} from "../../core/app.constants";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = SERVER_HOST + '/users/login';
  }

  public submitLogin(loginReq: LoginRequest): Observable<User> {
    return this.http.post<User>(this.usersUrl, loginReq);
  }
}
