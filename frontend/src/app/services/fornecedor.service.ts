import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fornecedor } from '../models/fornecedor';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  baseUrl = "http://localhost:8080/investidor";
  
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  
  constructor(private http: HttpClient) { }

  create(fornecedor: any): Observable<Fornecedor>{
    return this.http.post<Fornecedor>(`${this.baseUrl}/registro`, fornecedor, this.httpOptions)
  }

  read(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(`${this.baseUrl}`)
  }

  readById(id: string): Observable<Fornecedor>{
    return this.http.get<Fornecedor>(`${this.baseUrl}/${id}`)
  }

  update(fornecedor: any): Observable<Fornecedor>{
    return this.http.put<Fornecedor>(`${this.baseUrl}/${fornecedor._id}`, fornecedor);
  }

  delete(id: any): Observable<Fornecedor>{
    return this.http.delete<Fornecedor>(`${this.baseUrl}/${id}`);
  }

  search(list: Fornecedor[], name: String){
    if(list.length === 0 || name === undefined || name.trim() === ''){
      return list;
    }
    return list.filter((v)=>{
      if(v.nomeEmpresa.toLowerCase().indexOf(name.toLowerCase()) >= 0){
        return true;
      }
      return false;
    })
  }
}
