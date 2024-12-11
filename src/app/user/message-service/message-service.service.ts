import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat } from '../chat-class/chat'
import { Message } from '../message-class/message'
import { Observable, Subject, startWith, switchMap } from 'rxjs';
import { User } from '../model/user';
import { SERVER_HOST } from "../../core/app.constants";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageUrl: string;
  private usersUrl: string;
  private employeesUpdated$ = new Subject<void>();

  constructor(private http: HttpClient) {
    this.messageUrl = SERVER_HOST + '/message';
    this.usersUrl = SERVER_HOST + '/users';
  }

  public findAllChats(userID: Number): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.messageUrl}/FindAllChats/${userID}`);
  }

  public sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.messageUrl, message);
  }

  public updateChat(chatID: String): Observable<Chat> {
    return this.http.get<Chat>(`${this.messageUrl}/UpdateChat/${chatID}`);
  }

  public getUserIDs(userIDList: Number[]): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersUrl}/GetUserIDs/${userIDList}`);
  }
}
