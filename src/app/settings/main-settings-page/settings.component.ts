import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfilePageComponent } from '../../user/profile-page/profile-page.component';
import { UserSettingsComponent } from '../user-settings/user-settings.component';
import { MessagesComponent } from '../../user/messages-page/messages.component';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [RouterModule, ProfilePageComponent, NgIf, UserSettingsComponent, MessagesComponent]
})
export class SettingsComponent implements OnInit { 

  protected selectorNum = 0;

  constructor() {
  }

  ngOnInit() {
  }

  protected selectTabComponent(componentSelected: number): void {
    this.selectorNum = componentSelected;
    console.log("Num: " + this.selectorNum);
  }
}
