import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})


export class AuthService {
  
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(public router: Router,
    public http: HttpClient) { }

    login(login: string, senha: string) {
      const apiUrl = 'http://localhost:8080/auth/autenticacao';
      const body = {
        email: login,
        senha: senha
      };
      return this.http.post(apiUrl, body, this.httpOptions);
    }

    signup(nome: string, cpf: string, login: string, senha: string){
      const apiUrl = 'http://localhost:8080/auth/registro';
      const body = {
        nome: nome,
        cpf: cpf,
        email: login,
        senha: senha
      };
      return this.http.post(apiUrl, body, this.httpOptions);
    }

    clear(){
      localStorage.clear();
    }

    isAuthenticated(){
      return (localStorage.getItem('token') !== null? true: false);
    }

    logout(){
      this.clear();
    }
}
