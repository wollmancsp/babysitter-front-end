import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MessageService } from '../message-service/message-service.service';
import { User } from '../model/user';
import { AccountService } from "../account-service/account-service.service";
import { switchMap } from "rxjs";
import { Message } from "../message-class/message";
import { Chat } from "../chat-class/chat";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  standalone: true,
  imports: [RouterModule, NgFor, NgIf, AsyncPipe]
})
export class MessagesComponent implements OnInit {

  chatLoaded: Promise<boolean> = Promise.resolve(false);
  protected chatList: Chat[];
  protected chatSelectedID: number = -1;
  @ViewChild('myTextarea') myTextarea: ElementRef;
  protected usersList: User[];
  accService = inject(AccountService);
  account = this.accService.trackCurrentUser();
  protected refreshInterval: any;

  constructor(
    private messsageService: MessageService) {
  }

  ngOnInit() {
    let acc = this.account();
    if (acc === null) {
      console.log("Error loading chat_list");
      this.chatList = [];
    }else {
      const sub4 = this.messsageService.findAllChats(parseInt(acc.user_id))
      .pipe(
        switchMap(data1 => {
          this.chatList = data1;
          if(this.chatList.length > 0) {
            //Add all users based on full chat_list
            let userIDsList = [];
            for (let i = 0; i < this.chatList.length; i++)
              for (let j = 0; j < this.chatList[i].users_id_array.length; j++) {
                userIDsList.push(parseInt(this.chatList[i].users_id_array[j].toString()));
              }
            return this.messsageService.getUserIDs(userIDsList);
          }else {
            return [];
          }
        })
      )
      .subscribe(data2 => {
        this.usersList = data2;
        this.chatLoaded = Promise.resolve(true);
        sub4.unsubscribe();
      });
    }

    //Continually refresh chat for any new chats that might have been sent.S
    this.refreshData();
    this.refreshInterval = setInterval(() => {
      this.refreshData();
    }, 5000);
  }

  ngOnDestroy() {

  }

  refreshData() {
    let acc = this.account();
    if (acc !== null) {
      const sub1 = this.messsageService.findAllChats(parseInt(acc.user_id)).subscribe(data => {
        this.chatList = data;
        if(this.chatList.length > 0) {
          //Add all users based on full chat_list
          let userIDsList = [];
          for (let i = 0; i < this.chatList.length; i++)
            for (let j = 0; j < this.chatList[i].users_id_array.length; j++)
              userIDsList.push(parseInt(this.chatList[i].users_id_array[j].toString()));

          const sub2 = this.messsageService.getUserIDs(userIDsList).subscribe(data2 => {
            this.usersList = data2;
            this.chatLoaded = Promise.resolve(true);
          });
          setTimeout(() => {
            sub2.unsubscribe();
          }, 4000);
        }
        return null;
      });
      setTimeout(() => {
        sub1.unsubscribe();
      }, 4000);
    }
  }

  protected submitMessage(event: KeyboardEvent): void {
    if(event.key === 'Enter') {
      let acc = this.account();
      if (acc !== null) {
        var message = new Message('-1', acc.user_id.toString(), this.myTextarea.nativeElement.value, Date.now().toString(), this.chatList[this.chatSelectedID].chat_id.toString());
        this.myTextarea.nativeElement.value = "";
        this.messsageService.sendMessage(message).subscribe(data => {
          this.messsageService.updateChat(this.chatList[this.chatSelectedID].chat_id.toString()).subscribe(data2 => {
            this.chatList[this.chatSelectedID] = data2;
          });
        });
      }
    }
  }

  protected selectTabComponent(chatSelectedID: String): void {
    for (let i = 0; i < this.chatList.length; i++) {
      if(this.chatList[i].chat_id.toString() == chatSelectedID) {
        this.chatSelectedID = i;
        break;
      }
    }
  }

  protected getChatSpecificID(orgID: String): String {
    for (let i = 0; i < this.chatList.length; i++) {
      if(this.chatList[i].chat_id.toString() == orgID) {
        return i.toString();
      }
    }
    return "";
  }

  protected getChatUserNames(id: String): String {
    let CUarray = this.chatList[parseInt(this.getChatSpecificID(id).toString())].users_id_array;

    let namesString = "";
    for(let i = 0; i < CUarray.length; i++) {
      if(i != 0)
        namesString += ", ";
      namesString += this.getUserNameFromID(CUarray[i]);
    }
    return namesString;
  }

  protected getUserNameFromID(id: String): String {
    for(let i = 0; i < this.usersList.length; i++) {
      if(this.usersList[i].user_id.toString() == id.toString())
        return this.usersList[i].user_fname + " " + this.usersList[i].user_lname;
    }
    return "";
  }

  protected dateTimeFormatter(givenDT: String): String {
    if(givenDT != "") {
      //Format: 2024-11-02T22:58:55.000+00:00
      let newDT = "";
      console.log(givenDT);
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
      newDT += tempHour.toString() + givenDT.substring(13, 16) + timeEnd + "  " + givenDT.substring(5, 9) + "-" + givenDT.substring(0, 4);
      return newDT;
    }else {
      return "";
    }
  }
}
