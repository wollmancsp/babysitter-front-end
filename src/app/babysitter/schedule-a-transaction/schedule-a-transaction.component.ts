import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import {AccountService} from "../../user/account-service/account-service.service";
import { SATService } from "../schedule-a-transaction-service/sat-service.service";
import { User } from '../../user/model/user';

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

  constructor(private sATService: SATService) {
  }

  ngOnInit() {
  }
}
