import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormValidations } from '../../form-validations';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html'
})
export class ErrorMsgComponent implements OnInit {

  @Input() control: any;
  @Input() label: string = '';
  @Input() form: FormGroup = new FormGroup({});

  constructor() { }

  ngOnInit(): void {
    
  }

  get errorMessage(){
    if(this.form?.errors){
      if(this.form?.errors.equalsToEmail && this.control == this.form?.get('confirmarEmail')){
        return FormValidations.getErrorMsg('equalsToEmail')}
      if(this.form?.errors.equalsToPass && this.control == this.form?.get('confirmarSenha')){
          return FormValidations.getErrorMsg('equalsToPass');
      }
    } 
    for(const propertyName in this.control?.errors){
      if(this.control?.errors.hasOwnProperty(propertyName) && 
    this.control.dirty){
        return FormValidations.getErrorMsg(propertyName);
      }
    }
    return null;
  }

}
