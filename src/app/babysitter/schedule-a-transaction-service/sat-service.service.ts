import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { User } from '../../user/model/user';
import {Observable} from "rxjs";
import {Chat} from "../../user/chat-class/chat";
import {Message} from "../../user/message-class/message";
import {SERVER_HOST} from "../../core/app.constants";

@Injectable({
  providedIn: 'root'
})
export class SATService {

  private transactionURL: string;

  constructor(private http: HttpClient) {
    this.transactionURL = SERVER_HOST + '/transaction';
  }

  public submitTransaction(parentID: number, sitterID: number, details: string, startDate: Date, endDate: Date, pay: number): Observable<Boolean> {
    const params = new HttpParams()
      .set('p0', parentID)
      .set('p1', sitterID)
      .set('p2', details)
      .set('p3', startDate.toString())
      .set('p4', endDate.toString())
      .set('p5', pay);

    return this.http.post<Boolean>(`${this.transactionURL}/TransactionCreate`, params);
  }
}
