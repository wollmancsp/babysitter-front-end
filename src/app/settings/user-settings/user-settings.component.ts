import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
  standalone: true,
  imports: [RouterModule]
})
export class UserSettingsComponent implements OnInit { 

  constructor() {
  }

  ngOnInit() {
  }
}
