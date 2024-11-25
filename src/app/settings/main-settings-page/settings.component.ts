import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProfilePageComponent } from '../../user/profile-page/profile-page.component';
import { MessagesComponent } from '../../user/messages-page/messages.component';
import { TransactionComponent } from "../../transaction/transaction-page/transaction-page.component";

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [RouterModule, ProfilePageComponent, NgIf, MessagesComponent, AsyncPipe, TransactionComponent]
})
export class SettingsComponent implements OnInit {

  protected selectorNum: number;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe( params => {
      this.selectorNum = Number(params['id']);
    });
  }

  ngOnInit() {
  }

  protected selectTabComponent(componentSelected: number): void {
    this.selectorNum = componentSelected;
  }
}
