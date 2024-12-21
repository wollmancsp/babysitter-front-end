import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgIf } from '@angular/common';
import { AccountService } from '../../user/account-service/account-service.service';

@Component({
  standalone: true,
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [FontAwesomeModule, RouterModule, NgIf, CommonModule ]
})
export default class NavbarComponent implements OnInit {

  accService = inject(AccountService);
  account = this.accService.trackCurrentUser();

  constructor(

  ) {

  }

  ngOnInit(): void {
    
  }

  logOut(): void {
    this.accService.logout();
  }
}
