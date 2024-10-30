import { Component, OnInit, ViewChild, ElementRef, signal, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoginService } from '../login-service/login-service.service';
import { LoginRequest } from '../login-request-class/login-request';
import { AccountService } from '../../user/account-service/account-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  imports: [RouterModule]
})
export class LoginFormComponent implements OnInit { 

  @ViewChild('myEmail') myEmail: ElementRef;
  @ViewChild('myPassword') myPassword: ElementRef;

  authenticationError = signal(false);
  accService = inject(AccountService);

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
      private loginService: LoginService) {
  }

  ngOnInit() {
  }

  protected submitLogin(): void {
    var loginReq = new LoginRequest(this.myEmail.nativeElement.value, this.myPassword.nativeElement.value);
    this.loginService.submitLogin(loginReq).subscribe(data => {
      // console.log("Log: " + data);
      this.authenticationError.set(false);
      if(data != null) {
        this.accService.saveUser(data);
        if (!this.router.getCurrentNavigation()) {
          // There were no routing during login (eg from navigationToStoredUrl)
          this.router.navigate(['']);
        }
      }else {
        this.authenticationError.set(true)
      }
    });
  }
}
