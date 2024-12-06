import {inject, Injectable, OnInit, signal, Signal} from '@angular/core';
import { User } from '../model/user';
import {HttpClient} from "@angular/common/http";
import {SERVER_HOST} from "../../app.constants";
import {Observable} from "rxjs";
import {UserSessionStorageService} from "../user-session-storage/user-session-storage.component";

@Injectable({
  providedIn: 'root'
})
export class AccountService implements OnInit{

  private userIdentity = signal<User | null>(null);
  private usersUrl: string;
  private userPfp: File;
  private userSession = inject(UserSessionStorageService);

  constructor(private http: HttpClient) {
    this.usersUrl = SERVER_HOST + '/users';
    const userData = this.userSession.loadUserData();
    this.userIdentity.update(user => userData);
    // console.log("Init");
  }

  ngOnInit() {
  }

  saveUser(newUser: User | null): void {
    this.userIdentity.update(user => newUser);
    if (newUser)
      this.userSession.saveUserData(newUser);
    //console.log("Curr Acc: " + this.userIdentity);
  }

  updateUser(): Observable<User> {
    let temp = this.http.get<User>(`${this.usersUrl}/FindByUserID/${this.userIdentity()?.user_id}`);
    //console.log("T: " + temp);
    temp.subscribe(
      data => {
        console.log("T: " + data),
        this.userSession.saveUserData(data);
      }
    )
    return temp;
  }

  trackCurrentUser(): Signal<User | null> {
    //console.log("Curr Acc Tr: " + this.userIdentity);
    return this.userIdentity.asReadonly();
  }

  logout(): void {
    this.userIdentity.update(user => null);
    this.userSession.saveUserData(null);
  }
}
