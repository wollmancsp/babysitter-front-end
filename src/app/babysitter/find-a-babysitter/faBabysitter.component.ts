import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-find-a-babysitter',
  templateUrl: './faBabysitter.component.html',
  styleUrls: ['./faBabysitter.component.scss'],
  standalone: true,
  imports: [RouterModule, NgFor, NgIf]
})
export class FABabysitterComponent implements OnInit { 

  protected citySearch: String = "Temp";
  protected babysitterResultsList: String[] = ["1", "1", "1", "1", "1", "1", "1", "1"];

  constructor() {
  }

  ngOnInit() {
  }
}
