import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cidade } from '../models/cidade';
import { CodMunicipio } from '../models/codMunicipio';
import { EstadoBr } from '../models/estado';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http: HttpClient) { }

  consultarCep(cep: string){
    if(cep != '' && cep != null){
      cep = cep.replace(/\D/g, '');
      let validcep = /^[0-9]{8}$/;
      if(validcep.test(cep)){
        return this.http.get("https://viacep.com.br/ws/"+ cep + "/json");
      }
    }
    return of({}); //retorna um observable vazio;
  }

  getEstadosBr(){
    return this.http.get<EstadoBr[]>('assets/dados/estados-br.json')
  }

  getCidadesBr(idEstado: any){
    return this.http.get<Cidade[]>('assets/dados/cidades-br.json')
    .pipe(
      map((cidades: Cidade[]) => cidades.filter(v => v.estado == idEstado))
    )
  }

  getCodigoBr(nomeCidade: String){
    return this.http.get<CodMunicipio[]>('assets/dados/cod-municipio-br.json').pipe(
      map((municipios: CodMunicipio[]) => municipios.filter(v => v.nome.toLowerCase() === nomeCidade.toLowerCase()))
    )
  }
}
