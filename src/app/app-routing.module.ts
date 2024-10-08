
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { LoginFormComponent } from './loginPage/login-form/login-form.component';
import { RegisterFormComponent } from './loginPage/register-form/register-form.component';
import { ProfilePageComponent } from './loginPage/profile-page/profile-page.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'adduser', component: UserFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: '', loadComponent: () => import('./layouts/navbar/navbar.component'), outlet: 'navbar'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
