import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentIntermediaryService {

  private message: any = new BehaviorSubject(null);

  constructor() { }

  listenMessage(): Observable<any> {
    return this.message.asObservable();
  }

  emit(message: any) {
    this.message.next(message);
  }
}
