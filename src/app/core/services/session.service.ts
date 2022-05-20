import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { UserSession } from '../interfaces/user-session.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private userData = new BehaviorSubject<UserSession>(null);
  private tokenData = new BehaviorSubject<string>(null);

  constructor(
    private router: Router) { }

  get userSessionAsObservable(): Observable<UserSession> {
    return this.userData.asObservable();
  }

  get userSession(): UserSession {
    return this.userData.getValue();
  }

  set userSession(user: UserSession) {
    if (user) {
      localStorage.setItem('userSession', this._encrypt(JSON.stringify(user)));
      // this.cookieService.set('userSession', JSON.stringify(user));
    } else {
      localStorage.removeItem('userSession');
      // this.cookieService.delete('userSession');
    }
    this.userData.next(user);
  }

  get token(): string {
    return this.tokenData.getValue();
  }

  set token(token: string) {
    if (token) {
      localStorage.setItem('token', token);
      // this.cookieService.set('token', token);
    } else {
      localStorage.removeItem('token');
      // this.cookieService.delete('token');
    }
    this.tokenData.next(token);
  }

  logout(): void {
    this.userSession = null;
    this.token = null;
    localStorage.clear();
    // this.cookieService.deleteAll();
    this.router.navigateByUrl('');
  }

  clearSession(): void {
    this.userSession = null;
    this.token = null;
  }

  private getToken(): string {
    const token = localStorage.getItem('token');
    // const token = this.cookieService.get('token');
    return token ? token : null;
  }

  // @ts-ignore
  private getUserSession(): UserSession {
    const user = localStorage.getItem('userSession');
    // const user = this.cookieService.get('userSession');
    try {
      return user ? JSON.parse(this._decrypt(user)) : null;
    } catch (error) {
      this.logout();
    }
  }

  isLogged(): boolean {
    const token = this.getToken();
    const user = this.getUserSession();
    return token && user ? true : false;
  }

  async checkSession(): Promise<any> {
    const token = this.getToken();
    const user = this.getUserSession();
    this.tokenData.next(token ? token : null);
    this.userData.next(user ? user : null);
  }

  private _encrypt(value: string) : string{
    return CryptoJS.AES.encrypt(value, environment.SECRET_KEY).toString();
  }

  private _decrypt(value: string){
    return CryptoJS.AES.decrypt(value, environment.SECRET_KEY).toString(CryptoJS.enc.Utf8);
  }

}

