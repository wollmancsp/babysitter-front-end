import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import {Message} from "../message-class/message";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private usersUrl: string;
  private messageUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
    this.messageUrl = 'http://localhost:8080/message';
  }

  public findUser(userID: Number): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/FindByUserID/${userID}`);
  }

  public createNewChat(userID1: string, userID2: string): Observable<Boolean> {
    // Map<String, String> temp = new Map<>();
    // temp.("0", userID1);
    // let tempMap = new Map([["0", userID1], ["1", userID2]]);
    // let temp = 0;
    // console.log(tempMap + " " + typeof(tempMap.get("0")));
    // return this.http.post<Boolean>(`${this.messageUrl}/MessageCreate`, tempMap);
    // return this.http.post<Boolean>(`${this.messageUrl}/MessageCreate`, temp);
    // this.http.get<User>(`${this.messageUrl}/MessageCreate/${userID1}`); //Y Not Communicating?
    // return this.http.get<Boolean>(`${this.messageUrl}/Temp`);
    const params = new HttpParams()
      .set('p1', userID1)
      .set('p2', userID2);

    return this.http.post<Boolean>(`${this.messageUrl}/ChatCreate`,params);

    // var myMap = new Map();
    // myMap.set('1', 'value1');
    // myMap.set('2', 'value2');
    // myMap.set('3', 'value3');
    // myMap.set('4', 'value4');
    //
    // //Making JS Map compatible for JSON.Stringify
    // const out = Object.create(null)
    // myMap.forEach((value, key) => {
    //   if (value instanceof Map) {
    //     out[key] = map_to_object(value)
    //
    //   }
    //   else {
    //     out[key] = value
    //   }
  }
}
