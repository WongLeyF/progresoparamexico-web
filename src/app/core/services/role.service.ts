import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private resource = 'roles';

  constructor(private apiService: ApiService) { }

  getAll(): Observable<Array<Role>> {
    return this.apiService.get(`${this.resource}/`);
  }

  getByName(roleName: string): Observable<Role> {
    return this.apiService.get(`${this.resource}/name/${roleName}`);
  }

  getById(roleId: string): Observable<Role> {
    return this.apiService.get(`${this.resource}/${roleId}`);
  }

}
