import { Component, OnInit } from '@angular/core';
import { UserRole } from 'src/app/core/enums/user-role';
import { UserSession } from 'src/app/core/interfaces/user-session.interface';
import { ComponentIntermediaryService } from 'src/app/core/services/component-intermediary.service';
import { SessionService } from 'src/app/core/services/session.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-navbar-general',
  templateUrl: './navbar-general.component.html',
  styleUrls: ['./navbar-general.component.css']
})
export class NavbarGeneralComponent implements OnInit {

  userSession: UserSession;
  admin: boolean = false;
  super: boolean = false;

  constructor(
    private sessionService: SessionService,
    private componentIntermediaryService: ComponentIntermediaryService
  ) { }

  ngOnInit(): void {
    this.sessionService.userSessionAsObservable.subscribe(res => {
      this.userSession = res;
      this.super = this.userSession?.role.name == UserRole.SUPER_ADMINISTRADOR;
      this.admin = this.userSession?.role.name == UserRole.ADMINISTRADOR;
    });
  }

  async onLogout(): Promise<any> {

    // const answer = await this.swalAlertService.confirm('Confirmación', '¿Cerrar sesión?');

    this.sessionService.logout();
    this.componentIntermediaryService.emit({
      type: 'logOut'
    });
    // if (answer) {
    // }

  }


}
