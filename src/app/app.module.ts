import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es-MX';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderInterceptorService } from './core/services/header-interceptor.service';
import { UnauthorizedInterceptorService } from './core/services/unauthorized-interceptor.service';
import { SharedModule } from './modules/shared/shared.module';

registerLocaleData(localeEs);



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-MX' },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptorService, multi: true },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
