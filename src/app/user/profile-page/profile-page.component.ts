import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProfileService } from '../profile-page-service/profile-page.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { User } from '../model/user';
import { AccountService } from '../account-service/account-service.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  standalone: true,
  imports: [RouterModule, FontAwesomeModule]
})
export class ProfilePageComponent implements OnInit {

  //##### Beg of Profile Variables #####
  protected firstName = "Phillip";
  protected lastName = "Benson";

  protected addressLine1 = "12345 Elmer St.";
  protected addressLine2 = "Cour MN 12345";
  protected totalNumberRatings = 6;
  protected totalSumRatings = 27;

  protected reviewBlockHeader = "Kids had a Blast!";
  protected reviewBlockDate = "Apr 7, 2023";
  protected reviewBlockText = "Just a bunch of random jibberish text I came up with to fill the space until it is mostly full to show an example of overlap and how text may need to be handled in different ways during...";

  protected phoneNumber = "1-234-567-8901"
  protected email = "phil@ben.com"
  protected normalHours = "10am - 10pm";
  protected normalDays = "Friday - Sunday";
  protected prefChildAge = "3 - 10 y/o";
  protected hasPetsTF = "true";
  protected aboutMeDesc = "Hello, my name is Phillip, and I'm a 21 year old who is willing to take care of kids during the weekends. I would also be willing to cook for the kids for an extra fee. Foods include...";
  //##### End of Profile Variables #####

  accService = inject(AccountService);
  account = this.accService.trackCurrentUser();

  users: User[];
  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
      private profileService: ProfileService) {
  }

  ngOnInit() {
  }
}
