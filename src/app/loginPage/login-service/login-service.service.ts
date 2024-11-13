import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../login-request-class/login-request';
import { User } from '../../user/model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users/login';
  }

  public submitLogin(loginReq: LoginRequest): Observable<User> {
    return this.http.post<User>(this.usersUrl, loginReq);
  }
}
