import { Injectable, OnInit } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserSessionStorageService implements OnInit {

  userProfileData: User | null = null;

  constructor() {
    // console.log("Loaded: " + this.userProfileData);
    const data = localStorage.getItem('userProfileData');
    if(data) {
      this.userProfileData = JSON.parse(data);
    }
  }

  ngOnInit() {
  }

  loadUserData(): User | null {
    return this.userProfileData;
  }

  saveUserData(user: User | null): void {
    // console.log("Saved" + user?.user_id);
    this.userProfileData = user;
    localStorage.setItem('userProfileData', JSON.stringify(user));
  }
}
