
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { FormValidations } from '../form-base/form-validations';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  formulario_login: FormGroup = new FormGroup({});
  msgErro: string = '';
  mostrar: boolean = false;
  iconMostrarSenha: string = 'fa-eye-slash';

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private loginService: AuthService) { }

  ngOnInit(): void {

    this.formulario_login = this.formBuilder.group({
      email: [null, [Validators.required, FormValidations.emailValidator]],
      senha: [null, Validators.required]
    })
  }

  submit(){
    if(this.formulario_login.valid){
      let email = this.formulario_login.get('email')?.value;
      let senha = this.formulario_login.get('senha')?.value;
      this.loginService.login(email, senha)
      .pipe(
        take(1)
      )
      .subscribe((response: any) => {
        if(response){
          localStorage.setItem('token', response['token']);
          localStorage.setItem('user', JSON.stringify(response['user']));
          this.router.navigate(['/fornecedor']);
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
      Object.keys(this.formulario_login.controls).forEach((campo) => {
        const controle = this.formulario_login.get(campo);
        controle?.markAsDirty();
      });
      }
  }

  verificaEmailInvalido(){
    if(this.formulario_login.get('email')?.hasError('emailInvalido')){
      return "Email inválido."
    }
    return "Campo obrigatório."
  }

  verificaTouched(campo: any){
    return this.formulario_login.get(campo)?.touched;
  }

  mostrarErro(campo: any){;
    if(this.verificaTouched(campo) || this.formulario_login.get(campo)?.dirty){
      if(!this.formulario_login.get(campo)?.valid){
        return 'is-invalid';
      }
    }
    return null;
  }

  
  errorCredenciais(){
    if(this.msgErro){
      return 'is-invalid';
    }
    return null;
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
  
  ngOnDestroy(){
  }
}

