import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Career } from '../interfaces/career.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  private resource: string = 'career';
  
  constructor(private apiService: ApiService) { }

  getAll(): Observable<Array<Career>> {
    return this.apiService.get(`${this.resource}/`);
  }

  getById(careerId: string): Observable<Career> {
    return this.apiService.get(`${this.resource}/${careerId}`);
  }

  getByName(careerName: string): Observable<Career> {
    return this.apiService.get(`${this.resource}/name/${careerName}`);
  }

  getByInstituteId(careerInstituteId: string): Observable<Array<Career>> {
    return this.apiService.get(`${this.resource}/institute/${careerInstituteId}`);
  }

  create(career: Career): Observable<any> {
    return this.apiService.post(`${this.resource}/`, career);
  }

  update(careerId: string, career: Career): Observable<any> {
    return this.apiService.put(`${this.resource}/${careerId}`, career);
  }

  delete(careerId: string): Observable<any> {
    return this.apiService.delete(`${this.resource}/${careerId}`);
  }

}
