import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private usersUrl: string;
  private messageUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
    this.messageUrl = 'http://localhost:8080/message';
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
}
