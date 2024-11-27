import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SERVER_HOST} from "../../app.constants";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordServiceService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = SERVER_HOST + '/users';
  }

  public resetPassword(email: string, oldPassword: string, newPassword: string): Observable<string> {
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('currentPassword', oldPassword);
    params = params.append('newPassword', newPassword);

    //Source: https://stackoverflow.com/questions/50798592/angular-6-how-to-set-response-type-as-text-while-making-http-call
    //Response Type error (200, string)
    return this.http.put(`${this.usersUrl}/changePassword`, params, {responseType: 'text'});
  }
}
