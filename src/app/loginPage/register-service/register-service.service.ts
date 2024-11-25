import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../user/model/user';
import {SERVER_HOST} from "../../app.constants";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = SERVER_HOST + '/users';
  }

  public create(user: User) {
    return this.http.post<User>(`${this.usersUrl}/CreateUser`, user);
  }
}
