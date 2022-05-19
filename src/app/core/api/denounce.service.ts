import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class DenounceService {

  private resource = 'denounce';

  constructor(private apiService: ApiService) { }

  getAll():Observable<Array<any>> {
    return this.apiService.get(`${this.resource}/`);
  }

  create(denounce: any):Observable<any> {
    return this.apiService.post(`${this.resource}/`, denounce);
  }
}
