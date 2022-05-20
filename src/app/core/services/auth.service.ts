import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginData } from '../interfaces/login-data.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private resource = 'auth';

  constructor(private apiService: ApiService) { }

  login(loginData: LoginData): Observable<any> {
    return this.apiService.post(`${this.resource}/login`, loginData);
  }
}
