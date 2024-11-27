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
    this.pullUserPfp().subscribe(data => {
      this.userPfp = data;
      console.log("Loaded: " + this.userPfp);
      // console.log("Found: " + data);
    });
  }

  pullUserPfp(): Observable<File> {
    return this.http.get<File>(`${this.usersUrl}/ReturnPfp/${this.userIdentity()?.user_profilepicture}`);
  }

  trackCurrentUser(): Signal<User | null> {
    //console.log("Curr Acc Tr: " + this.userIdentity);
    return this.userIdentity.asReadonly();
  }

  hasAdminAuthority(): boolean {
    const userIdentity = this.userIdentity();
    if (!userIdentity) {
      return false;
    }
    return userIdentity.user_role;
  }

  logout(): void {
    this.userIdentity.update(user => null);
    this.userSession.saveUserData(null);
  }

  getUserPfp(): File {
    console.log("Name: " + this.userPfp.name);
    return this.userPfp;
  }
}
