import { Component, OnInit } from '@angular/core';
//import { User } from '../model/user';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RegisterService } from '../register-service/register-service.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  standalone: true,
  imports: [RouterModule]
})
export class RegisterFormComponent implements OnInit { 

  //users: User[];
  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
      private registerService: RegisterService) {
    //this.user = new User();
  }

  ngOnInit() {
    // this.loginService.findAll().subscribe(data => {
    //   //this.users = data;
    // });
  }
}
