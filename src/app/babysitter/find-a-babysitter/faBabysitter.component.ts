import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import {AccountService} from "../../user/account-service/account-service.service";
import {FABService} from "../find-a-babysitter-service/find-a-babysitter-service.service";
import { User } from '../../user/model/user';
import {SERVER_HOST} from "../../core/app.constants";

@Component({
  selector: 'app-find-a-babysitter',
  templateUrl: './faBabysitter.component.html',
  styleUrls: ['./faBabysitter.component.scss'],
  standalone: true,
  imports: [RouterModule, NgFor, NgIf]
})
export class FABabysitterComponent implements OnInit {

  protected citySearch: String = "Temp";
  protected babysitterResultsList: User[];
  accService = inject(AccountService);
  account = this.accService.trackCurrentUser();
  @ViewChild('myInputArea') myInputArea: ElementRef;

  constructor(private fABService: FABService) {
  }

  ngOnInit() {
    this.initSearch();
  }

  protected submitSearch(event: KeyboardEvent): void {
    if(event.key === 'Enter') {
      this.fABService.searchByCity(this.myInputArea.nativeElement.value).subscribe(data => {
        this.babysitterResultsList = data;
      });
    }
  }

  protected initSearch(): void {
    this.fABService.randomSearchByCity().subscribe(data => {
      this.babysitterResultsList = data;
    });
  }

  protected readonly SERVER_HOST = SERVER_HOST;
  protected readonly Date = Date;
}
