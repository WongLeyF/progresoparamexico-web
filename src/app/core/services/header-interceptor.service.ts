import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptorService implements HttpInterceptor {

  constructor(private sessionService: SessionService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers = req.headers
      .set('Authorization', `Bearer ${this.sessionService.token}`);

    const authReq = req.clone({ headers });

    return next.handle(authReq);

  }

}
