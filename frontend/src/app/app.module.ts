import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBaseModule } from './form-base/form-base.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HeaderModule } from './header/header.module';
import { SignupModule } from './signup/signup.module';
import { LoginComponent } from './login/login.component';
import { AutoLogoutService } from './services/auto-logout.service';

import { registerLocaleData } from '@angular/common';
import localept from '@angular/common/locales/pt';

registerLocaleData(localept);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormBaseModule,
    DashboardModule,
    HeaderModule,
    SignupModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  },
  AutoLogoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
