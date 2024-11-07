import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../user/model/user';
import {Observable} from "rxjs";
import {Chat} from "../../user/chat-class/chat";

@Injectable({
  providedIn: 'root'
})
export class SATService {

  private messageUrl: string;
  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.messageUrl = 'http://localhost:8080/message';
    this.usersUrl = 'http://localhost:8080/users';
  }
}
