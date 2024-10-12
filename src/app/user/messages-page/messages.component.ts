import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Message } from '../message-class/message';
import { Chat } from '../chat-class/chat';
import { NgFor, NgIf } from '@angular/common';
import { MessageService } from '../message-service/message-service.service';

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

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
      private  messsageService: MessageService) {
  }

  ngOnInit() {

    this.messsageService.findAllChats(8).subscribe(data => {
      console.log("RET: " + data);
      this.chat_list = data;
    });
    //8 Is temporary user ID until login is ready

    //No Chat ID For all prebuilt messages
    // var chat1 = new Chat("0", ['1', '2'], [new Message("1", "1", "1pm", "Hey!"), new Message("2", "2", "1:30pm", "Yo yo!"), new Message("2", "2", "2pm", "Yo!"), new Message("2", "2", "2:30pm", "Yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo yo!"), new Message("2", "2", "3pm", "Yo!"), new Message("2", "2", "3:30pm", "Yo!"), new Message("2", "2", "4pm", "Yo!"), new Message("2", "2", "4:30pm", "Yo!"), new Message("2", "2", "5pm", "Yo!"), new Message("2", "2", "5:30pm", "Yo!")]);
    // this.chat_list.push(chat1);
    // var chat2 = new Chat("3", ['1', '2'], [new Message("1", "1", "2pm", "No!"), new Message("2", "2", "2:30pm", "Bye!")]);
    // this.chat_list.push(chat2);
    // var chat3 = new Chat("77", ['1', '2'], [new Message("1", "1", "3pm", "Welp!"), new Message("2", "2", "3:30pm", "lol!")]);
    // this.chat_list.push(chat3);
  }

  // protected openChat() {
  //   this.messsageService.findAllChats(this.chatSelectedID).subscribe(data => {
  //     console.log("RET: " + data);
  //     this.chat_list[this.chatSelectedID] = data;
  //   });
  // }

  protected selectTabComponent(chatSelectedID: string): void {
    for (let i = 0; i < this.chat_list.length; i++) {
      if(this.chat_list[i].chat_id == chatSelectedID) {
        this.chatSelectedID = i;
        break;
      }
    }
  }
}
