
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './loginPage/login-form/login-form.component';
import { RegisterFormComponent } from './loginPage/register-form/register-form.component';
import { ProfilePageComponent } from './user/profile-page/profile-page.component';
import { HomeComponent } from './home/home.component';
import { FABabysitterComponent } from './babysitter/find-a-babysitter/faBabysitter.component';
import { BABabysitterComponent } from './babysitter/become-a-babysitter/baBabysitter.component';
import { SettingsComponent } from './settings/main-settings-page/settings.component';
import { UserSettingsComponent } from './settings/user-settings/user-settings.component';
import { AdminComponent } from './admin/admin-page/admin.component';
import {ScheduleATransactionComponent} from "./babysitter/schedule-a-transaction/schedule-a-transaction.component";
import {TransactionService} from "./transaction/transaction-page-service/transaction-page.service";
import {
  TransactionComponent
} from "./transaction/transaction-page/transaction-page.component";

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'profile/:userid', component: ProfilePageComponent },
  { path: '', component: HomeComponent },
  { path: 'findBabysitter', component: FABabysitterComponent },
  { path: 'becomeBabysitter', component: BABabysitterComponent },
  { path: 'scheduleATransaction/:id', component: ScheduleATransactionComponent },
  { path: 'settings/:id', component: SettingsComponent },
  { path: 'userSettings', component: UserSettingsComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: '', loadComponent: () => import('./layouts/navbar/navbar.component'), outlet: 'navbar'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
