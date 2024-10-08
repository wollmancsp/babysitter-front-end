import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { VERSION } from '../../app.constants';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  standalone: true,
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [FontAwesomeModule, RouterModule]
})
export default class NavbarComponent implements OnInit {
  inProduction?: boolean;
  isNavbarCollapsed = signal(true);
  version = '';

  private router = inject(Router);

  constructor() {
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`;
    }
  }

  ngOnInit(): void {}

  collapseNavbar(): void {
    this.isNavbarCollapsed.set(true);
  }

  // login(): void {
  //   this.router.navigate(['/login']);
  // }

  logout(): void {}

  toggleNavbar(): void {
    this.isNavbarCollapsed.update(isNavbarCollapsed => !isNavbarCollapsed);
    // /console.log("NavCCollapsed : " + this.isNavbarCollapsed);
  }
}
