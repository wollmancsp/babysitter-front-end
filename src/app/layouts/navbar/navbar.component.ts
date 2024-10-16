import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VERSION } from '../../app.constants';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [FontAwesomeModule, RouterModule, NgIf, CommonModule ]
})
export default class NavbarComponent implements OnInit {
  inProduction?: boolean;
  isNavbarCollapsed = signal(true);
  version = '';

  private router = inject(Router);

  constructor(
    
  ) {
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`;
    }
  }

  ngOnInit(): void {}

  collapseNavbar(): void {
    this.isNavbarCollapsed.set(true);
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed.update(isNavbarCollapsed => !isNavbarCollapsed);
  }
}
