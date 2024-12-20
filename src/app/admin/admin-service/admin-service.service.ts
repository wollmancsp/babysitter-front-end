import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { User } from '../../user/model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public PromoteUser(userID: number): Observable<Boolean> {
    const params = new HttpParams()
      .set('p1', userID);
    return this.http.post<Boolean>(`${this.usersUrl}/PromoteUser`,params);
  }

  public DeleteUser(userID: number): Observable<Boolean> {
    const params = new HttpParams()
      .set('p1', userID);
    return this.http.post<Boolean>(`${this.usersUrl}/DeleteUser`,params);
  }

}
