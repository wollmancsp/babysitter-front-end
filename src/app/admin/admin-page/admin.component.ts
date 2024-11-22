import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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

  constructor(
      private adminService: AdminService) {
  }

  ngOnInit() {
    this.adminService.getAllUsers().subscribe(data => {
      this.userList = data;
    });
  }

  protected PromoteUser(userID: number) {
    this.adminService.PromoteUser(userID).subscribe(data => {
      console.log(data);
    });
  }

  protected DeleteUser(userID: number) {
    if(confirm("Are you sure to delete " + userID)) {
      this.adminService.DeleteUser(userID).subscribe(data => {
        console.log(data);
      });
    }
  }

  protected readonly parseInt = parseInt;
}
