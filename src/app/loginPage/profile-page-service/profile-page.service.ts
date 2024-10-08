import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/profile';
  }
}