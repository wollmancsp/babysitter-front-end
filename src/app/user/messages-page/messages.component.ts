import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {MessageService} from '../message-service/message-service.service';
import {User} from '../model/user';
import {AccountService} from "../account-service/account-service.service";
import {Observable, switchMap} from "rxjs";
import {Message} from "../message-class/message";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  standalone: true,
  imports: [RouterModule, NgFor, NgIf, AsyncPipe]
})
export class MessagesComponent implements OnInit {

  chatLoaded: Promise<boolean> = Promise.resolve(false);
  protected chat_list: any;
  protected chatSelectedID: number = -1;
  @ViewChild('myTextarea') myTextarea: ElementRef;
  protected tempUserID: number = 8;
  protected usersList: User[];
  accService = inject(AccountService);
  account = this.accService.trackCurrentUser();
  private refreshInterval: any;

  protected chat_list2: Observable<any>;
  protected tempDate: Date;
  protected tempNum: number = 0;




  constructor(
    private messsageService: MessageService) {
  }

  ngOnInit() {
    let acc = this.account();
    if (acc === null) {
      console.log("Error loading chat_list");
      this.chat_list = [];
    }else {
      const sub4 = this.messsageService.findAllChats(parseInt(acc.user_id))
      .pipe(
        switchMap(data1 => {
          this.chat_list = data1;

          //Add all users based on full chat_list
          let userIDsList = [];
          for (let i = 0; i < this.chat_list.length; i++)
            for (let j = 0; j < this.chat_list[i].users_id_array.length; j++)
              userIDsList.push(parseInt(this.chat_list[i].users_id_array[j]));
          return this.messsageService.getUserIDs(userIDsList);
        })
      )
      .subscribe(data2 => {
        this.usersList = data2;
        this.chatLoaded = Promise.resolve(true);
        sub4.unsubscribe();
      });
      // setTimeout(() => {
      //   sub4.unsubscribe();
      //   console.log("Done2");
      // }, 5000);
    }

    this.refreshData();
    this.refreshInterval = setInterval(() => {
      this.refreshData();
    }, 5000);
  }

  ngOnDestroy() {

  }

  refreshData() {
    // console.log("Refresh");
    let acc = this.account();
    if (acc !== null) {
      const sub1 = this.messsageService.findAllChats(parseInt(acc.user_id)).subscribe(res=>{console.log('Sub1')}, data => {
        this.chat_list = data;
        console.log("RET: " + this.chat_list.length);

        //Add all users based on full chat_list
        let userIDsList = [];
        for (let i = 0; i < this.chat_list.length; i++)
          for (let j = 0; j < this.chat_list[i].users_id_array.length; j++)
            userIDsList.push(parseInt(this.chat_list[i].users_id_array[j]));

        const sub2 = this.messsageService.getUserIDs(userIDsList).subscribe(res=>{console.log('Sub2')}, data2 => {
          this.usersList = data2;
          this.chatLoaded = Promise.resolve(true);
        });
        setTimeout(() => {
          sub2.unsubscribe();
          console.log("Done2");
        }, 3000);
      });
      setTimeout(() => {
        sub1.unsubscribe();
        console.log("Done1");
      }, 4000);
    }
  }

  protected submitMessage(event: KeyboardEvent): void {
    const sub = this.messsageService.employees$.subscribe(data => {
      this.tempDate = data;
    });

    setTimeout(() => {
      sub.unsubscribe();
    }, 5000);


    if(event.key === 'Enter') {
      // console.log(`The user pressed: ${event.key}`);
      let acc = this.account();
      if (acc !== null) {
        // console.log("TEMP2: " + this.chat_list[0].chat_id);
        var message = new Message('-1', this.tempUserID.toString(), this.myTextarea.nativeElement.value, Date.now().toString(), this.chat_list[this.chatSelectedID].chat_id.toString());
        // console.log("ID: " + message.message_id + "UserID: " + message.user_id + "Text: " + message.message_text + "Date: " + message.message_time + "ChatID: " + this.chat_list[this.chatSelectedID].chat_id);
        this.myTextarea.nativeElement.value = "";
        this.messsageService.sendMessage(message).subscribe(data => {
          // console.log("MSG Sub: " + data);
          this.messsageService.updateChat(this.chat_list[this.chatSelectedID].chat_id).subscribe(data2 => {
            this.chat_list[this.chatSelectedID] = data2;
            console.log("Chat Updated!" + data2.messages_array.length);
          });
        });
      }
    }
  }

  protected selectTabComponent(chatSelectedID: string): void {
    for (let i = 0; i < this.chat_list.length; i++) {
      if(this.chat_list[i].chat_id == chatSelectedID) {
        this.chatSelectedID = i;
        break;
      }
    }
  }

  protected getChatSpecificID(orgID: string): string {
    for (let i = 0; i < this.chat_list.length; i++) {
      if(this.chat_list[i].chat_id == orgID) {
        return i.toString();
      }
    }
    return "";
  }

  protected getChatUserNames(id: string): string {
    let CUarray = this.chat_list[parseInt(this.getChatSpecificID(id))].users_id_array;

    let namesString = "";
    for(let i = 0; i < CUarray.length; i++) {
      if(i != 0)
        namesString += ", ";
      namesString += this.getUserNameFromID(CUarray[i]);
    }
    return namesString;
  }

  protected getUserNameFromID(id: string): String {
    for(let i = 0; i < this.usersList.length; i++) {
      if(this.usersList[i].user_id.toString() === id.toString())
        return this.usersList[i].user_fname + " " + this.usersList[i].user_lname;
    }
    return "";
  }
}
