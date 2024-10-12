import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoginService } from '../login-service/login-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  imports: [RouterModule]
})
export class LoginFormComponent implements OnInit { 

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
      private loginService: LoginService) {
  }

  ngOnInit() {
  }

  temp(): void {

  }
}
