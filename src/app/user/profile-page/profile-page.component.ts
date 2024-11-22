import {Component, inject, OnInit, signal, Signal} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProfileService } from '../profile-page-service/profile-page.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { User } from '../model/user';
import { AccountService } from '../account-service/account-service.service';
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  standalone: true,
  imports: [RouterModule, FontAwesomeModule, AsyncPipe, NgIf]
})
export class ProfilePageComponent implements OnInit {

  accService = inject(AccountService);
  account = this.accService.trackCurrentUser();
  viewedAccount: User;
  viewedAccountNumber: Number;
  createChatError: Signal<Boolean> = signal(false);

  constructor(
    private route: ActivatedRoute,
      private router: Router,
      private profileService: ProfileService) {

    this.route.params.subscribe( params => {
      if(params['userid'] != undefined && params['userid'] != null) {
        this.viewedAccountNumber = params['userid'];
        this.profileService.findUser(this.viewedAccountNumber).subscribe(data => {
          this.viewedAccount = data;
        });
      }else {
        let acc = this.account();
        if(acc !== null) {
          this.viewedAccountNumber = parseInt(acc.user_id);
          this.viewedAccount = acc;
        }
      }
    });
  }

  ngOnInit() {
  }

  createNewChat() {
    let acc = this.account();
    if(acc !== null) {
      this.profileService.createNewChat(acc.user_id.toString(), this.viewedAccountNumber.toString()).subscribe(data => {
        var returnData = data;
      });
      if (!this.router.getCurrentNavigation()) {
        this.router.navigate(['settings', 1]);
      }
    }else {
      this.createChatError = signal(true);
    }
  }

  createNewTransaction() {
    if (!this.router.getCurrentNavigation()) {
      this.router.navigate(['scheduleATransaction', this.viewedAccountNumber]);
    }
  }
}
