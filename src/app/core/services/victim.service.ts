import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Victim } from '../interfaces/victim.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class VictimService {

  private resource = 'victim';

  constructor(private apiService: ApiService) { }

  getAll(): Observable<Array<Victim>> {
    return this.apiService.get(`${this.resource}/`);
  }

  getById(victimId: string): Observable<Victim> {
    return this.apiService.get(`${this.resource}/${victimId}`);
  }

  create(victim: Victim): Observable<any> {
    return this.apiService.post(`${this.resource}/`, victim);
  }

  update(victim: Victim): Observable<any> {
    return this.apiService.put(`${this.resource}/${victim._id}`, victim);
  }

}
