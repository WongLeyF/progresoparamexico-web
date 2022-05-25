import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Institute } from '../interfaces/institute.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class InstituteService {

  private resource: string = 'institute';

  constructor(private apiService: ApiService) { }

  getAll(): Observable<Array<Institute>> {
    return this.apiService.get(`${this.resource}/`);
  }

  getById(instituteId: string): Observable<Institute> {
    return this.apiService.get(`${this.resource}/${instituteId}`);
  }

  getByName(instituteName: string): Observable<Institute> {
    return this.apiService.get(`${this.resource}/name/${instituteName}`);
  }

  getByEmail(instituteEmail: string): Observable<Institute> {
    return this.apiService.get(`${this.resource}/email/${instituteEmail}`);
  }

  getByGrade(instituteGrade: string): Observable<Array<Institute>> {
    return this.apiService.get(`${this.resource}/grade/${instituteGrade}`);
  }

  create(institute: Institute): Observable<any> {
    return this.apiService.post(`${this.resource}/`, institute);
  }
}
