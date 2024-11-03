import { Component, inject, OnInit, signal } from '@angular/core';
//import { User } from '../model/user';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RegisterService } from '../register-service/register-service.service';
import { User } from '../../user/model/user';
import { LoginRequest } from '../login-request-class/login-request';
import { LoginService } from '../login-service/login-service.service';
import { AccountService } from '../../user/account-service/account-service.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  user: User;
  authenticationError = signal(false);
  accService = inject(AccountService);

  constructor(
    private route: ActivatedRoute,
      private router: Router,
      private registerService: RegisterService,
      private loginService: LoginService) {
        this.user = new User();
        this.user.user_address = "-";
        this.user.user_city = "-";
        this.user.user_zip = "-";
        this.user.user_role = false;
        this.user.user_enabled = true;
  }

  onSubmit() {
    this.registerService.create(this.user).subscribe({
      complete: () => {
        this.loginReRoute()},
    });
  }

  ngOnInit() {
  }

  protected loginReRoute(): void {
    var loginReq = new LoginRequest(this.user.user_emailaddress, this.user.user_password);
    this.loginService.submitLogin(loginReq).subscribe(data => {
      this.authenticationError.set(false);
      if(data != null) {
        this.accService.saveUser(data);
        if (!this.router.getCurrentNavigation()) {
          this.router.navigate(['']);
        }
      }else {
        this.authenticationError.set(true)
      }
    });
  }
}
