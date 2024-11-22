import {Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TransactionService } from '../transaction-page-service/transaction-page.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccountService } from '../../user/account-service/account-service.service';
import { AsyncPipe, NgClass, NgFor, NgIf } from "@angular/common";
import { Transaction } from "../transaction-model/transaction";

@Component({
  selector: 'transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.scss'],
  standalone: true,
  imports: [RouterModule, FontAwesomeModule, AsyncPipe, NgIf, NgFor, NgClass]
})
export class TransactionComponent implements OnInit {

  accService = inject(AccountService);
  account = this.accService.trackCurrentUser();
  protected jobSelectorNum: number = 0;
  protected statusSelectorNum: number = 0;
  protected timeSelectorNum: number = 1;
  protected fullTransactionList: Array<Transaction> = [];
  protected selectedTransactionList: Array<Transaction> = [];

  constructor(
      private transactionService: TransactionService) {
    let acc = this.account();
    if(acc != null) {
      this.transactionService.getAllTransactions(parseInt(acc.user_id)).subscribe(data => {
        this.fullTransactionList = data;
        this.localGetJobs();
      });
    }
  }

  ngOnInit() {
  }

  protected selectJob(selectedNumber: number): void {
    //YouReqORWork: 0 = Requested (You are Parent), 1 = Working (You are sitter)
    this.jobSelectorNum = selectedNumber;
    this.localGetJobs();
  }

  protected selectStatus(selectedNumber: number): void {
    //PastORFut 0 = Past, 1 = Future
    this.statusSelectorNum = selectedNumber;
    this.localGetJobs();
  }

  protected selectTransactionTime(selectedNumber: number): void {
    //PastORFut 0 = Past, 1 = Future
    this.timeSelectorNum = selectedNumber;
    this.localGetJobs();
  }

  protected localGetJobs(): void {
    //YouReqORWork: 0 = Requested (You are Parent), 1 = Working (You are sitter)
    //Status: 0 = Pending, 1 = Accepted, 2 = Declined
    //PastORFut 0 = Past, 1 = Future
    let YouReqORWork = this.jobSelectorNum;
    let Status = this.statusSelectorNum;
    let PastORFut = this.timeSelectorNum;

    let temp = new Array(0);
    this.selectedTransactionList = [];
    let addIndex = 0;
    let acc = this.account();

    if(acc != null) {
      for(let i = 0; i < this.fullTransactionList.length; i++) {
        let itemDeletedTF = false;

        //YouReqORWork Check:
        if(YouReqORWork == 0) {
          if(this.fullTransactionList[i].job_parent != parseInt(acc.user_id)) {
            itemDeletedTF = true;
          }
        }else if (YouReqORWork == 1) {
          if(this.fullTransactionList[i].job_sitter != parseInt(acc.user_id)) {
            itemDeletedTF = true;
          }
        }

        //Status Check:
        if(Status == 0) {
          if(this.fullTransactionList[i].job_status != 0) {
            itemDeletedTF = true;
          }
        }else if (Status == 1) {
          if(this.fullTransactionList[i].job_status != 1) {
            itemDeletedTF = true;
          }
        }else if (Status == 2) {
          if(this.fullTransactionList[i].job_status != 2) {
            itemDeletedTF = true;
          }
        }

        //PastORFut Check:
        if(PastORFut == 0) {
          if(new Date(this.fullTransactionList[i].job_end).getTime() > Date.now()) {
            itemDeletedTF = true;
          }
        }else if (PastORFut == 1) {
          if(new Date(this.fullTransactionList[i].job_end).getTime() <= Date.now()) {
            itemDeletedTF = true;
          }
        }

        //Add if fits all criteria
        if (!itemDeletedTF) {
          temp = new Array(temp.length + 1);
          temp[addIndex] = this.fullTransactionList[i];
          addIndex += 1;
        }
      }
      this.selectedTransactionList = temp;
    } else {
      this.selectedTransactionList = [];
    }
  }

  protected SubmitNewTransactionStatus(transactionID: number, newStatus: number): void {
    this.transactionService.updateTransactionStatus(transactionID, newStatus).subscribe(data => {

    });
  }

  protected readonly parseInt = parseInt;
}
