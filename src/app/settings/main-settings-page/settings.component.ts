import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { ProfilePageComponent } from '../../user/profile-page/profile-page.component';
import { UserSettingsComponent } from '../user-settings/user-settings.component';
import { MessagesComponent } from '../../user/messages-page/messages.component';
import {ProfileService} from "../../user/profile-page-service/profile-page.service";

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [RouterModule, ProfilePageComponent, NgIf, UserSettingsComponent, MessagesComponent, AsyncPipe]
})
export class SettingsComponent implements OnInit {

  protected selectorNum: Number;

  constructor(private route: ActivatedRoute,
              private ref: ChangeDetectorRef) {
    this.route.params.subscribe( params => {
      this.selectorNum = params['id'];
    });
  }

  ngOnInit() {
  }

  protected selectTabComponent(componentSelected: Number): void {
    // this.ref.detectChanges();
    this.selectorNum = componentSelected;
    // console.log("Num: " + this.selectorNum);
  }

  protected protectedInit(one: Number): void {
    // this.ref.detectChanges();
    this.selectorNum = one;
  }
}
