import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat } from '../chat-class/chat'
import { Message } from '../message-class/message'
import {Observable, Subject, startWith, switchMap, tap, of} from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageUrl: string;
  private usersUrl: string;
  private employeesUpdated$ = new Subject<void>();

  //Source: https://stackoverflow.com/questions/72251269/how-to-update-a-subscription-to-a-get-request-after-posting-new-data-to-the-back
  employees$ = this.employeesUpdated$.pipe(
    startWith({}),
    switchMap(() =>
      this.http.get<Date>(`${this.messageUrl}/TestSubscribe`)
    )
  );


  constructor(private http: HttpClient) {
    this.messageUrl = 'http://localhost:8080/message';
    this.usersUrl = 'http://localhost:8080/users';
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
