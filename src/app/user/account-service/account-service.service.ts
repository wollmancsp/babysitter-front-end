import { Injectable, signal, Signal } from '@angular/core';
import { User } from '../../user/model/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userIdentity = signal<User | null>(null);

  saveUser(newUser: User | null): void { //WritableSignal<Transaction | null>;
    // this.userIdentity = signal(user);
    this.userIdentity.update(user => newUser);
    // console.log("Curr Acc: " + this.userIdentity);
  }

  trackCurrentUser(): Signal<User | null> {
    // console.log("Curr Acc Tr: " + this.userIdentity);
    return this.userIdentity.asReadonly();
  }

  hasAdminAuthority(): boolean {
    const userIdentity = this.userIdentity();
    if (!userIdentity) {
      return false;
    }
    return userIdentity.user_role;
  }

  logout(): void {
    this.userIdentity.update(user => null);
  }
}
