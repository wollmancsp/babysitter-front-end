import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user-class/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
  }

  public create(user: User) {
    return this.http.post<User>(this.usersUrl, user);
  }
}