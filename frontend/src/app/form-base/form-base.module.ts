import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from './input-field/input-field.component';
import { ErrorMsgComponent } from './input-field/error-msg/error-msg.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InputFieldComponent,
    ErrorMsgComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [InputFieldComponent,
  ErrorMsgComponent]
})
export class FormBaseModule { }
