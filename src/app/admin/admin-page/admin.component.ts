import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { AdminService } from '../admin-service/admin-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [RouterModule, NgFor, NgIf]
})
export class AdminComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
      private adminService: AdminService) {
  }

  ngOnInit() {
    
  }
}
