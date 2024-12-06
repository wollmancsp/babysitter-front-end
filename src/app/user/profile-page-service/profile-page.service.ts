import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import {SERVER_HOST} from "../../app.constants";
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private usersUrl: string;
  private messageUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = SERVER_HOST + '/users';
    this.messageUrl = SERVER_HOST + '/message';
  }

  public findUser(userID: Number): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/FindByUserID/${userID}`);
  }

  public createNewChat(userID1: string, userID2: string): Observable<Boolean> {
    const params = new HttpParams()
      .set('p1', userID1)
      .set('p2', userID2);
    return this.http.post<Boolean>(`${this.messageUrl}/ChatCreate`,params);
  }

  public UploadPFP(file: FormData, userID: number): Observable<Boolean> {
    const params = new HttpParams()
      .set('p1', userID);
    let headers = new HttpHeaders();
    /** In Angular 5, including the header Content-Type can invalidate your request */
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<Boolean>(`${this.usersUrl}/setUserPFP`, file, { headers: headers, params: params});
  }

  public EditProfile(user: User): Observable<Boolean> { //formData: FormData
    return this.http.post<Boolean>(`${this.usersUrl}/EditUserProfile`, user);
  }
}
