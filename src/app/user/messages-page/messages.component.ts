import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Message } from '../message-class/message';
import { Chat } from '../chat-class/chat';
import { NgFor, NgIf } from '@angular/common';
import { MessageService } from '../message-service/message-service.service';
import { User } from '../model/user';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  standalone: true,
  imports: [RouterModule, NgFor, NgIf]
})
export class MessagesComponent implements OnInit {

  protected chat_list: Chat[];
  protected chatSelectedID: number = -1;
  @ViewChild('myTextarea') myTextarea: ElementRef;
  protected tempUserID: number = 8;
  protected usersList: User[];


  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
      private messsageService: MessageService) {
  }

  ngOnInit() {
    //8 Is temporary user ID until login is ready
    this.messsageService.findAllChats(this.tempUserID).subscribe(data => {
      // console.log("RET: " + data);
      this.chat_list = data;
    });
  }

  protected submitMessage(event: KeyboardEvent): void {
    if(event.key === 'Enter') {
      // console.log(`The user pressed: ${event.key}`);
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

  protected selectTabComponent(chatSelectedID: string): void {
    for (let i = 0; i < this.chat_list.length; i++) {
      if(this.chat_list[i].chat_id == chatSelectedID) {
        this.chatSelectedID = i;
        break;
      }
    }
    this.messsageService.getUserIDs(this.chat_list[this.chatSelectedID].users_id_array.map(str => parseInt(str, 10))).subscribe(data2 => {
      this.usersList = data2;
    });
  }

  protected loadUsersList(id: string): void {
    this.messsageService.getUserIDs(this.chat_list[parseInt(id)].users_id_array.map(str => parseInt(str, 10))).subscribe(data2 => {
      this.usersList = data2;
    });
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
    console.log("Test");
    let CUarray = this.chat_list[parseInt(this.getChatSpecificID(id))].users_id_array;

    this.messsageService.getUserIDs(this.chat_list[parseInt(this.getChatSpecificID(id))].users_id_array.map(str => parseInt(str, 10))).subscribe(data2 => {
      this.usersList = data2;
    });



    console.log("UL Len: " + this.usersList)

    let namesString = "";
    for(let i = 0; i < CUarray.length; i++) {
      if(i != 0)
        namesString += " ";
      namesString += this.getUserNameFromID(CUarray[i]);
    }
    return namesString;


    // let CUarray = this.chat_list[parseInt(this.getChatSpecificID(id))].users_id_array;
    // console.log("Chat: " + id);
    // console.log("Chat2: " + CUarray.length);
    // this.loadUsersList(this.getChatSpecificID(id));
    // console.log("UL:" + this.usersList.length);

    // let namesString = "";
    // for(let i = 0; i < CUarray.length; i++) {
    //   if(i != 0)
    //     namesString += " ";
    //   namesString += this.getUserNameFromID(CUarray[i]);
    // }
    // return namesString;
  }

  protected getUserNameFromID(id: String): String {
    for(let i = 0; i < this.usersList.length; i++) {
      if(this.usersList[i].user_id === id)
        return this.usersList[i].user_fname + " " + this.usersList[i].user_lname;
    }
    return "";
  }
}
