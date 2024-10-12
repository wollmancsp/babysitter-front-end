import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat } from '../chat-class/chat'
import { Message } from '../message-class/message'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/message';
  }

  public findAllChats(userID: Number): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.usersUrl}/${userID}`);
  }

  // public findAllMessages(chatID: Number): Observable<Message[]> {
  //   return this.http.get<Message[]>(`${this.usersUrl}/${chatID}`);
  // }
}