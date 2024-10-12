import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-find-a-babysitter',
  templateUrl: './faBabysitter.component.html',
  styleUrls: ['./faBabysitter.component.scss'],
  standalone: true,
  imports: [RouterModule]
})
export class FABabysitterComponent implements OnInit { 

  constructor() {
  }

  ngOnInit() {
  }
}
