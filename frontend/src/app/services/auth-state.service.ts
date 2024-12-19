import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  authStatus$ = this.isAuthenticated.asObservable();

  setAuthStatus(isAuthenticated: boolean): void {
    this.isAuthenticated.next(isAuthenticated);
  }
}
