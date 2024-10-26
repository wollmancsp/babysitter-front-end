import { Component, OnInit } from '@angular/core';
//import { User } from '../model/user';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RegisterService } from '../register-service/register-service.service';
import { User } from '../../user/model/user';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit { 

  user: User;

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
      private registerService: RegisterService) {
        this.user = new User();
  }

  onSubmit() {
    this.registerService.create(this.user).subscribe();
  }

  ngOnInit() {
  }
}
