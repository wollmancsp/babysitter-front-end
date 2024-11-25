import {Component, ElementRef, inject, OnInit, signal, Signal, ViewChild} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProfileService } from '../profile-page-service/profile-page.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { User } from '../model/user';
import { AccountService } from '../account-service/account-service.service';
import {AsyncPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  standalone: true,
  imports: [RouterModule, FontAwesomeModule, AsyncPipe, NgIf, NgOptimizedImage]
})
export class ProfilePageComponent implements OnInit {

  accService = inject(AccountService);
  account = this.accService.trackCurrentUser();
  viewedAccount: User;
  viewedAccountNumber: Number;
  createChatError: Signal<Boolean> = signal(false);
  image: any;
  @ViewChild('myImg') myImg: HTMLImageElement;

  constructor(
    private route: ActivatedRoute,
      private router: Router,
      private profileService: ProfileService,
      private sanitizer: DomSanitizer) {

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
          this.ImageConvert(acc.user_profilepicture)
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

  protected EditProfile() {
    if (!this.router.getCurrentNavigation()) {
      this.router.navigate(['profileEdit']);
    }
  }

  protected ImageConvert(file: number[] | undefined) {
    console.log(file);
    // console.log(typeof file);

    if(file != undefined) {
      const base64String = btoa(encodeURIComponent(String.fromCharCode.apply(null, file)));
      // var base64String = decodeURIComponent(escape(window.atob(String.fromCharCode.apply(null, file))));
      const imageUrl = `data:image/jpeg;base64,${base64String}`;
      this.myImg = new Image();
      this.myImg.src = imageUrl;
      console.log(this.myImg.src);
    }


    // console.log(this.image);
  }
}
