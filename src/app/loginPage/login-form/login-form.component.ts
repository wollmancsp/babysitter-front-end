import { Component, OnInit } from '@angular/core';
//import { User } from '../model/user';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoginService } from '../login-service/login-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true, //standalone: true needed with single imports //https://stackoverflow.com/questions/72517141/how-to-import-standalone-components-from-a-lib-in-angular-14
  imports: [RouterModule]
})
export class LoginFormComponent implements OnInit { 

  //users: User[];
  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
      private loginService: LoginService) {
    //this.user = new User();
  }

  ngOnInit() {
    // this.loginService.findAll().subscribe(data => {
    //   //this.users = data;
    // });
  }

  temp(): void {

  }
}
