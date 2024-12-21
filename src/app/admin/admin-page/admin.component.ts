import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { AdminService } from '../admin-service/admin-service.service';
import { User } from '../../user/model/user';
import { AccountService } from '../../user/account-service/account-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [RouterModule, NgFor, NgIf]
})
export class AdminComponent implements OnInit {

  userList: User[];
  accService = inject(AccountService);
  account = this.accService.trackCurrentUser();
  protected readonly parseInt = parseInt;

  constructor(
      private adminService: AdminService) {
  }

  ngOnInit() {
    this.getUserData();
  }

  protected getUserData() {
    this.adminService.getAllUsers().subscribe(data => {
      this.userList = data;
    });
  }

  protected PromoteUser(userID: number) {
    this.adminService.PromoteUser(userID).subscribe(data => {
      this.getUserData();
    });
  }

  protected DeleteUser(userID: number) {
    if(confirm("Are you sure to delete " + userID)) {
      this.adminService.DeleteUser(userID).subscribe(data => {
        this.getUserData();
      });
    }
  }

  protected ToggleUserEnable(userEnabled: boolean, userID: number) {
    this.adminService.ToggleUserEnable(userEnabled, userID).subscribe(data => {
      this.getUserData();
    });
  }

  protected userEnabledGUI(userEnabled: boolean): String {
    if(userEnabled) {
      return "✓";
    }else {
      return "X";
    }
  }
}
