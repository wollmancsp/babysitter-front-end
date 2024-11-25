import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../user/model/user';
import {Observable} from "rxjs";
import {SERVER_HOST} from "../../app.constants";

@Injectable({
  providedIn: 'root'
})
export class FABService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = SERVER_HOST + '/users';
  }

  public searchByCity(city: String): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersUrl}/SearchByCity/${city}`);
  }
}
