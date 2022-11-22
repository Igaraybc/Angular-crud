import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-password-meter',
  templateUrl: './password-meter.component.html',
  styleUrls: ['./password-meter.component.scss']
})
export class PasswordMeterComponent implements OnInit {

  @Input() password: string = '';
  @Input() minLength: number = 8;
  @Input() numberCheck?: boolean = true;
  @Input() specialCharCheck?: boolean = true;
  @Input() smallcaseCheck?: boolean = true;
  @Input() uppercaseCheck?: boolean = true;


  @Output() strengthChange = new EventEmitter<number>();
  public strengthText: string = '';
  public score: number = 0;
  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.password) {
      this.checkStrength();
    }
  }

  checkStrength() {
    if(this.password){
      let totalCriteria = 1; //One is always there becuse there will be atleast 8 char length check
      totalCriteria = this.numberCheck ? totalCriteria + 1 : totalCriteria;
      totalCriteria = this.specialCharCheck ? totalCriteria + 1 : totalCriteria;
      totalCriteria = this.smallcaseCheck ? totalCriteria + 1 : totalCriteria;
      totalCriteria = this.uppercaseCheck ? totalCriteria + 1 : totalCriteria;
      this.score = 0;
      this.score = this.isLengthMet()? this.score + parseFloat((100 / totalCriteria).toFixed(2)) : this.score;
      this.score = this.specialCharCheck && this.isSpecialCharMet() ? this.score + parseFloat((100 / totalCriteria).toFixed(2)) : this.score;
      this.score = this.numberCheck && this.isNumberMet()           ? this.score + parseFloat((100 / totalCriteria).toFixed(2)) : this.score;
      this.score = this.smallcaseCheck && this.isSmallcaseMet()     ? this.score + parseFloat((100 / totalCriteria).toFixed(2)) : this.score;
      this.score = this.uppercaseCheck && this.isUppercaseMet()     ? this.score + parseFloat((100 / totalCriteria).toFixed(2)) : this.score;
      this.getStrengthText();
    }
    else{
      this.score = 0;
      this.getStrengthText();
    }
  }
  isLengthMet() {
    if(this.password.length >= this.minLength) {
      return true;
    } else {
      return false;
    }
  }
  isSpecialCharMet() {
    if( (/[!@#$%*]/).test(this.password) ){
      return true;
    } else {
      return false;
    }
  }
  isNumberMet() {
    if((/[0-9]/).test(this.password)) {
      return true;
    } else {
      return false;
    }
  }
  isSmallcaseMet() {
    if( (/[a-z]/).test(this.password) ) {  
      return true;
    } else {
      return false;
    }
  }
  isUppercaseMet() {
    if( (/[A-Z]/).test(this.password) ) {
      return true;
    } else {
      return false;
    }
  }

  getStrengthText() {
    this.strengthText = ''
    switch (this.score) {
      case 1:
      case 20:
      case 25:      
        this.strengthText = 'Muito curta';
        break;
      case 2:
      case 33.33:
      case 40:      
        this.strengthText = 'Fraca';
        break;
      case 3:
      case 60:
      case 50:
      case 66.66:
        this.strengthText = 'Média';
        break;
      case 4:
      case 80:
      case 75:
        this.strengthText = 'Boa';
        break;
      case 5:
      case 100:
      case 99.99:
        this.strengthText = 'Forte';
        break;

    }
  }
}
