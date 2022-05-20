import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { UserSession } from '../interfaces/user-session.interface';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private sessionService: SessionService,
    private router: Router) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      if (this.sessionService.isLogged()) {

        const user: UserSession = this.sessionService.userSession;
  
        if (route.data['roles'] && route.data['roles'].indexOf(user.role.name) === -1) {
          this.router.navigate(['/']);
          return false;
        }
  
        return true;
  
      } else {
  
        this.sessionService.logout();
        return false;
  
      }
  }
  
}
