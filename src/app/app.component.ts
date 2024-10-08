import { Component, inject } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fontAwesomeIcons } from './config/font-awesome-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'testAngApp';
  private iconLibrary = inject(FaIconLibrary);

  constructor() {
    this.iconLibrary.addIcons(...fontAwesomeIcons);
  }
}
