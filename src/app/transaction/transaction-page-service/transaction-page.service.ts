import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { Transaction } from "../transaction-model/transaction";
import { SERVER_HOST } from "../../core/app.constants";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactionURL: string;

  constructor(private http: HttpClient) {
    this.transactionURL = SERVER_HOST + '/transaction';
  }

  public getAllTransactions(userID: Number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.transactionURL}/GetTransactionsByUserID/${userID}`);
  }

  public updateTransactionStatus(transactionID: number, newStatus: number): Observable<Boolean> {
    const params = new HttpParams()
      .set('p0', transactionID)
      .set('p1', newStatus);
    return this.http.post<Boolean>(`${this.transactionURL}/UpdateTransactionStatus`, params);
  }
}
