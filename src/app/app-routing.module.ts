
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

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'profile/:id', component: ProfilePageComponent },
  { path: '', component: HomeComponent },
  { path: 'findBabysitter', component: FABabysitterComponent },
  { path: 'becomeBabysitter', component: BABabysitterComponent },
  { path: 'settings/:id', component: SettingsComponent },
  { path: 'userSettings', component: UserSettingsComponent },
  { path: 'admin', component: AdminComponent },
  { path: '', loadComponent: () => import('./layouts/navbar/navbar.component'), outlet: 'navbar'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
