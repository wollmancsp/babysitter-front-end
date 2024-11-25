import {Component, ElementRef, inject, OnInit, signal, Signal, ViewChild} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProfileService } from '../profile-page-service/profile-page.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { User } from '../model/user';
import { AccountService } from '../account-service/account-service.service';
import {AsyncPipe, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-profile-page-edit',
  templateUrl: './profile-page-edit.component.html',
  styleUrls: ['./profile-page-edit.component.scss'],
  standalone: true,
  imports: [RouterModule, FontAwesomeModule, AsyncPipe, NgIf, FormsModule, ReactiveFormsModule]
})
export class ProfilePageEditComponent implements OnInit {

  accService = inject(AccountService);
  account = this.accService.trackCurrentUser();
  selectedFile: File;
  //@ViewChild('selectedFile') selectedFile: ElementRef;

  constructor(
      private router: Router,
      private profileService: ProfileService) {
  }

  ngOnInit() {
  }

  // protected uploadPFP(userID: string) {
  //   if (this.selectedFile) {
  //     const formData = new FormData();
  //     formData.append('image', this.selectedFile, this.selectedFile.name);
  //     //this.profileService.UploadPFP(formData, parseInt(userID)).subscribe(data => {
  //
  //     //});
  //   }
  // }

  onSubmit() {
    let acc = this.account();
    if(acc != null) {
      const formData = new FormData();
      formData.append('userID', acc.user_id);
      //formData.append('image', this.selectedFile.nativeElement.value);
      const reader = new FileReader();

      formData.append('image', new Blob([reader.result as ArrayBuffer], { type: this.selectedFile.type }), this.selectedFile.name);
      this.profileService.EditProfile(formData).subscribe({
        complete: () => {
          if (!this.router.getCurrentNavigation()) {
            this.router.navigate(['profile', acc.user_id]);
          }
        },
      });
    }
  }
}
