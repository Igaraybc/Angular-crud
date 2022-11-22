import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { AppRoutingModule } from '../app-routing.module';
import { PasswordMeterComponent } from './password-meter/password-meter.component';
import { FormBaseModule } from '../form-base/form-base.module';



@NgModule({
  declarations: [
    SignupComponent,
    PasswordMeterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormBaseModule
  ],
  exports: [  ]
})
export class SignupModule { 

}
