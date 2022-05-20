import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private resource = 'users';

  constructor(private apiService: ApiService) { }

  // getAll(filters: FilterUsers): Observable<PaginationData<User>> {
  //   return this.apiService.get(`${this.resource}/`, filters);
  // }

  register(user: User): Observable<any> {
    return this.apiService.post(`${this.resource}/`, user);
  }

  // getResumen(): Observable<Array<RoleResumen>> {
  //   return this.apiService.get(`${this.resource}/resumen`);
  // }

  getByEmail(email: string): Observable<User> {
    return this.apiService.get(`${this.resource}/email/${email}`);
  }

  update(userId: string, user: User): Observable<User> {
    return this.apiService.put(`${this.resource}/${userId}`, user);
  }

}
