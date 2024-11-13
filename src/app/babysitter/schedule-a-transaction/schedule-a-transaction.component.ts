import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import {AccountService} from "../../user/account-service/account-service.service";
import { SATService } from "../schedule-a-transaction-service/sat-service.service";

@Component({
  selector: 'app-find-a-babysitter',
  templateUrl: './schedule-a-transaction.component.html',
  styleUrls: ['./schedule-a-transaction.component.scss'],
  standalone: true,
  imports: [RouterModule, NgFor, NgIf]
})
export class ScheduleATransactionComponent implements OnInit {

  accService = inject(AccountService);
  account = this.accService.trackCurrentUser();

  @ViewChild('myDetails') myDetails: ElementRef;
  @ViewChild('myStartDate') myStartDate: ElementRef;
  @ViewChild('myEndDate') myEndDate: ElementRef;
  @ViewChild('myPay') myPay: ElementRef;
  protected parentID: number = -1;
  protected sitterID: number = -1;

  constructor(private sATService: SATService,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.params.subscribe( params => {
      this.sitterID = params['id'];
    });
  }

  ngOnInit() {
  }

  submitTransactions(): void {
    let acc = this.account();
    if(acc === null) {
      return;
      //Error, not signed in
    }else {
      this.parentID = parseInt(acc.user_id);
      this.sATService.submitTransaction(this.parentID, this.sitterID, this.myDetails.nativeElement.value, this.myStartDate.nativeElement.value, this.myEndDate.nativeElement.value, this.myPay.nativeElement.value).subscribe(data => {
        if (!this.router.getCurrentNavigation()) {
          // There were no routing during login (eg from navigationToStoredUrl)
          this.router.navigate(['']);
        }
      });
    }
  }
}
