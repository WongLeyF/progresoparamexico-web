import { Component } from '@angular/core';
import { SessionService } from './core/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'progresoparamexico-web';

  constructor(
    private sessionService: SessionService,
  ) { 
    this.sessionService.checkSession();
  }

}
