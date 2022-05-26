import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aggressor } from '../interfaces/aggressor.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AggressorService {

  private resource = 'aggressor';

  constructor(private apiService: ApiService) { }

  getAll(): Observable<Array<Aggressor>> {
    return this.apiService.get(`${this.resource}/`);
  }

  getById(aggressorId: string): Observable<Aggressor> {
    return this.apiService.get(`${this.resource}/${aggressorId}`);
  }

  create(aggressor: Aggressor): Observable<any> {
    return this.apiService.post(`${this.resource}/`, aggressor);
  }

  update(aggressor: Aggressor): Observable<any> {
    return this.apiService.put(`${this.resource}/${aggressor._id}`, aggressor);
  }

  delete(aggressorId: string): Observable<any> {
    return this.apiService.delete(`${this.resource}/${aggressorId}`);
  }

  // find by params name lastname
  getByNameLastNameInstituteGender(name: string, lastName: string, instituteId, gender): Observable<Array<Aggressor>> {
    return this.apiService.get(`${this.resource}/search/${name}/${lastName}/${instituteId}/${gender}`);
  }

}
