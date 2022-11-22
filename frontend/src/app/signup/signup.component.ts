import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { FormValidations } from '../form-base/form-validations';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  formulario_signup = new FormGroup({});
  mostrar: boolean = false;
  iconMostrarSenha: string = 'fa-eye-slash';
  msgErro: string = '';

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private loginService: AuthService) { }

  ngOnInit(): void {
    
    this.formulario_signup = this.formBuilder.group({
      nome: [null, [Validators.required]],
      email: [null, [Validators.required, FormValidations.emailValidator]],
      confirmarEmail: [null, [Validators.required]],
      cpf: [null, [Validators.required, FormValidations.cpfValidator]],
      senha: [null, [Validators.required, Validators.minLength(8)]],
      confirmarSenha: [null, [Validators.required]]
    },
    {
      validators: [FormValidations.matchesEmail, FormValidations.matchesPassword]
      
    }
    );
  }

  backtoLogin(){
    this.router.navigate(['/login']);
  }

  submit(){
    console.log(this.formulario_signup);
    if(this.formulario_signup.valid){
      let email = this.formulario_signup.get('email')?.value;
      let senha = this.formulario_signup.get('senha')?.value;
      let cpf = this.formulario_signup.get('cpf')?.value;
      let nome = this.formulario_signup.get('nome')?.value;
      this.loginService.signup(nome, cpf, email, senha).pipe(
        take(1)
      )
      .subscribe((response: any) => {
        if(response){
          console.clear();
          this.router.navigate(['/login']);
        }
        else{

          alert('Ocorreu um erro. Tente novamente');
        }
      },
      (error) => {
        if(error.error.error){
         this.msgErro = error.error.error;
         setTimeout(() => {
          this.msgErro = '';
        }, 5000);
      }});
    } else{
      Object.keys(this.formulario_signup.controls).forEach((campo) => {
        const controle = this.formulario_signup.get(campo);
        controle?.markAsDirty();
      });
      }
  }

  verificaTouched(campo: any){
    return this.formulario_signup.get(campo)?.touched;
  }

  mostrarErro(campo: any){
    if(this.verificaTouched(campo) || this.formulario_signup.get(campo)?.dirty){
      if(!this.formulario_signup.get(campo)?.valid){
        return 'is-invalid';
      }
    }
    return null;
  }

  confirmaEmail(){
    this.formulario_signup.hasError('equalsToEmail');
  }

  mostrarSenha(){
    this.mostrar = !this.mostrar;
    if(this.mostrar){
      this.iconMostrarSenha = 'fa-eye';
    }
    else{
      this.iconMostrarSenha = 'fa-eye-slash';
    }
    return this.mostrar;
  }

  errorCredenciais(){
    if(this.msgErro){
      return 'is-invalid';
    }
    return null;
  }

  ngOnDestroy(){
  }
}

