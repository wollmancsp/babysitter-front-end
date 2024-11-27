import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../user/model/user';
import { ResetPasswordServiceService } from "../reset-password-service/reset-password-service.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'reset-password-page',
  templateUrl: './reset-password-page.component.html',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule
  ],
  styleUrls: ['./reset-password-page.component.scss']
})
export class ResetPasswordPageComponent implements OnInit {

  user: User;
  @ViewChild('myEmail') myEmail: ElementRef;
  @ViewChild('myOldPassword') myOldPassword: ElementRef;
  @ViewChild('myNewPassword') myNewPassword: ElementRef;

  constructor(
      private router: Router,
      private resetPassService: ResetPasswordServiceService) {
      this.user = new User();
  }

  onSubmit() {
    this.resetPassService.resetPassword(this.myEmail.nativeElement.value, this.myOldPassword.nativeElement.value, this.myNewPassword.nativeElement.value).subscribe({
      complete: () => {
        if (!this.router.getCurrentNavigation()) {
          this.router.navigate(['/login']);
        }
      },
    });
  }

  ngOnInit() {
  }
}
