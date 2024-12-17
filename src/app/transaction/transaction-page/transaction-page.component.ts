import {Component, inject, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
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
export class TransactionComponent implements OnInit, AfterViewInit{

  accService = inject(AccountService);
  account = this.accService.trackCurrentUser();
  protected jobSelectorNum: number = 0;
  protected statusSelectorNum: number = 0;
  protected timeSelectorNum: number = 1;
  protected fullTransactionList: Array<Transaction> = [];
  protected selectedTransactionList: Array<Transaction> = [];
  protected readonly parseInt = parseInt;

  @ViewChild('canvasJobReq') canvasJobReq: ElementRef;
  @ViewChild('canvasJobWork') canvasJobWork: ElementRef;
  @ViewChild('canvasPending') canvasPending: ElementRef;
  @ViewChild('canvasAccepted') canvasAccepted: ElementRef;
  @ViewChild('canvasDeclined') canvasDeclined: ElementRef;
  @ViewChild('canvasUpcoming') canvasUpcoming: ElementRef;
  @ViewChild('canvasPast') canvasPast: ElementRef;

  constructor(
      private transactionService: TransactionService) {
    let acc = this.account();
    if(acc != null) {
      this.transactionService.getAllTransactions(parseInt(acc.user_id)).subscribe(data => {
        this.fullTransactionList = data;
        this.localGetJobs();
        this.findAllTransactionCounts();
      });
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  protected findAllTransactionCounts(): void {
    let acc = this.account();
    if(acc != null) {
      let transactionTypeList = [0, 0, 0, 0, 0, 0, 0]; //Job Req, Job Work, Pending, Accepted, Declined, Upcoming, Past
      let YouReqORWork = this.jobSelectorNum;
      let Status = this.statusSelectorNum;

      for(let i = 0; i < this.fullTransactionList.length; i++) {
        //Jobs Working & Selected Counter
        if (this.fullTransactionList[i].job_parent == parseInt(acc.user_id)) {
          transactionTypeList[0] += 1;
        }
        if (this.fullTransactionList[i].job_sitter == parseInt(acc.user_id)) {
          transactionTypeList[1] += 1;
        }

        if(YouReqORWork == 0 && this.fullTransactionList[i].job_parent == parseInt(acc.user_id)) {
          //'Jobs You Requested' - Selected
          if (this.fullTransactionList[i].job_status == 0) {
            transactionTypeList[2] += 1;

            //'Pending' - Selected
            if(Status == 0 && new Date(this.fullTransactionList[i].job_end).getTime() > Date.now()) {
              transactionTypeList[5] += 1;
            }else if (Status == 0 && new Date(this.fullTransactionList[i].job_end).getTime() <= Date.now()) {
              transactionTypeList[6] += 1;
            }
          }else if (this.fullTransactionList[i].job_status == 1) {
            transactionTypeList[3] += 1;

            //'Accepted' - Selected
            if(Status == 1 && new Date(this.fullTransactionList[i].job_end).getTime() > Date.now()) {
              transactionTypeList[5] += 1;
            }else if (Status == 1 && new Date(this.fullTransactionList[i].job_end).getTime() <= Date.now()) {
              transactionTypeList[6] += 1;
            }
          }else if (this.fullTransactionList[i].job_status == 2) {
            transactionTypeList[4] += 1;

            //'Declined' - Selected
            if(Status == 2 && new Date(this.fullTransactionList[i].job_end).getTime() > Date.now()) {
              transactionTypeList[5] += 1;
            }else if (Status == 2 && new Date(this.fullTransactionList[i].job_end).getTime() <= Date.now()) {
              transactionTypeList[6] += 1;
            }
          }
        }else if(YouReqORWork == 1 && this.fullTransactionList[i].job_sitter == parseInt(acc.user_id)) {
          //'Jobs You're Working' - Selected
          if (this.fullTransactionList[i].job_status == 0) {
            transactionTypeList[2] += 1;

            //'Pending' - Selected
            if(Status == 0 && new Date(this.fullTransactionList[i].job_end).getTime() > Date.now()) {
              transactionTypeList[5] += 1;
            }else if (Status == 0 && new Date(this.fullTransactionList[i].job_end).getTime() <= Date.now()) {
              transactionTypeList[6] += 1;
            }
          }else if (this.fullTransactionList[i].job_status == 1) {
            transactionTypeList[3] += 1;

            //'Accepted' - Selected
            if(Status == 1 && new Date(this.fullTransactionList[i].job_end).getTime() > Date.now()) {
              transactionTypeList[5] += 1;
            }else if (Status == 1 && new Date(this.fullTransactionList[i].job_end).getTime() <= Date.now()) {
              transactionTypeList[6] += 1;
            }
          }else if (this.fullTransactionList[i].job_status == 2) {
            transactionTypeList[4] += 1;

            //'Declined' - Selected
            if(Status == 2 && new Date(this.fullTransactionList[i].job_end).getTime() > Date.now()) {
              transactionTypeList[5] += 1;
            }else if (Status == 2 && new Date(this.fullTransactionList[i].job_end).getTime() <= Date.now()) {
              transactionTypeList[6] += 1;
            }
          }
        }
      }




      this.colorTransactionNotifications(transactionTypeList);
    }
  }

  protected colorTransactionNotifications(transactionTypeList: Array<Number>): void {


    for(let i = 0; i < transactionTypeList.length; i++) {
      let canvas;
      switch (i) {
        case 0:
          canvas = this.canvasJobReq.nativeElement;
          break;
        case 1:
          canvas = this.canvasJobWork.nativeElement;
          break;
        case 2:
          canvas = this.canvasPending.nativeElement;
          break;
        case 3:
          canvas = this.canvasAccepted.nativeElement;
          break;
        case 4:
          canvas = this.canvasDeclined.nativeElement;
          break;
        case 5:
          canvas = this.canvasUpcoming.nativeElement;
          break;
        case 6:
          canvas = this.canvasPast.nativeElement;
          break;
      }
      let ctx = canvas.getContext('2d'); //20 by 20 size

      canvas.style.left = "-14px";
      canvas.style.top = "-15px";
      canvas.style.position = "relative";

      ctx.fillStyle = '#97aec7'; //#97aec7??
      ctx.beginPath();
      ctx.arc(10, 10, 10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.font = "20px Arial";
      ctx.fillStyle = 'black';
      ctx.fillText(transactionTypeList[i], 5, 17, 20);
      ctx.stroke();
    }
  }

  protected selectJob(selectedNumber: number): void {
    //YouReqORWork: 0 = Requested (You are Parent), 1 = Working (You are sitter)
    this.jobSelectorNum = selectedNumber;
    this.localGetJobs();
    this.findAllTransactionCounts();
  }

  protected selectStatus(selectedNumber: number): void {
    //PastORFut 0 = Past, 1 = Future
    this.statusSelectorNum = selectedNumber;
    this.localGetJobs();
    this.findAllTransactionCounts();
  }

  protected selectTransactionTime(selectedNumber: number): void {
    //PastORFut 0 = Past, 1 = Future
    this.timeSelectorNum = selectedNumber;
    this.localGetJobs();
    this.findAllTransactionCounts();
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

  protected dateTimeFormatter(inputDT: Date): String {
    if(inputDT != null) {
      let givenDT = inputDT.toString();
      if(givenDT != "") {
        //Format: 2024-11-02T22:58:55.000+00:00
        let newDT = "";
        let tempHour = parseInt(givenDT.substring(11, 13));
        tempHour -= 6; //UTC to Central
        let timeEnd = "am";
        if (tempHour > 12) {
          tempHour -= 12;
          timeEnd = "pm";
        }
        if(tempHour <= 0) {
          tempHour += 12;
          timeEnd = "pm";
        }
        newDT += "  " + givenDT.substring(5, 9) + "-" + givenDT.substring(0, 4) + " " + tempHour.toString() + givenDT.substring(13, 16) + timeEnd;
        return newDT;
      }
    }
    return "To Be Determined";
  }
}
