import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
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
    private route: ActivatedRoute, 
      private router: Router, 
      private adminService: AdminService) {
  }

  ngOnInit() {
    this.adminService.getAllUsers().subscribe(data => {
      this.userList = data;
    });
  }
}
