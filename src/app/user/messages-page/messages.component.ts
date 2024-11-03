import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Message } from '../message-class/message';
import { Chat } from '../chat-class/chat';
import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import { MessageService } from '../message-service/message-service.service';
import { User } from '../model/user';
import {AccountService} from "../account-service/account-service.service";
import {Observable, Subscription} from "rxjs";

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
  private subscription: Subscription;
  private subscription2: Subscription;

  protected chat_list2: Observable<any>;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messsageService: MessageService) {
  }

  ngOnInit() {
    let acc = this.account();
    if (acc === null) {
      console.log("Error loading chat_list");
      this.chat_list = [];
    }else {

      this.subscription = this.messsageService.findAllChats(parseInt(acc.user_id)).subscribe(data => {
        this.chat_list = data;
        // console.log("RET: " + this.chat_list.length);
        // console.log("TEMP3: " + this.chat_list[0].chat_id);

        //Add all users based on full chat_list
        let userIDsList = [];
        for (let i = 0; i < this.chat_list.length; i++)
          for (let j = 0; j < this.chat_list[i].users_id_array.length; j++)
            userIDsList.push(parseInt(this.chat_list[i].users_id_array[j]));

        this.messsageService.getUserIDs(userIDsList).subscribe(data2 => {
          this.usersList = data2;
          this.chatLoaded = Promise.resolve(true);
        });
      });
      this.subscription.unsubscribe();
    }

    this.refreshData();
    this.refreshInterval = setInterval(() => {
      this.refreshData();
    }, 5000);
  }

  refreshData() {
    console.log("Refresh");
    // if(this.subscription2 !== undefined)
    //   this.subscription2.unsubscribe();
    let acc = this.account();
    if (acc !== null) {
      this.subscription2 = this.messsageService.findAllChats(parseInt(acc.user_id)).subscribe(data => {
        this.chat_list = data;
        console.log("RET: " + this.chat_list.length);

        //Add all users based on full chat_list
        let userIDsList = [];
        for (let i = 0; i < this.chat_list.length; i++)
          for (let j = 0; j < this.chat_list[i].users_id_array.length; j++)
            userIDsList.push(parseInt(this.chat_list[i].users_id_array[j]));

        this.messsageService.getUserIDs(userIDsList).subscribe(data2 => {
          this.usersList = data2;
          this.chatLoaded = Promise.resolve(true);
        });
      });
    }
  }

  protected submitMessage(event: KeyboardEvent): void {
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
