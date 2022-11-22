import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { FormValidations } from 'src/app/form-base/form-validations';
import { Cidade } from 'src/app/models/cidade';
import { EstadoBr } from 'src/app/models/estado';
import { CepService } from 'src/app/services/cep.service';
import { FornecedorService } from '../../../services/fornecedor.service';

@Component({
  selector: 'app-update-fornecedor',
  templateUrl: './update-fornecedor.component.html',
  styleUrls: ['./update-fornecedor.component.css']
})
export class UpdateFornecedorComponent implements OnInit {

  formulario_fornecedor = new FormGroup({});
  cidades: Cidade[] = [];
  estados: EstadoBr[] = [];
  msgErro: String = '';


  constructor(private crudService: FornecedorService,
    private route: ActivatedRoute,
    private router: Router,
    private cepService: CepService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formulario_fornecedor = this.formBuilder.group({
      _id: [null],
      nomeEmpresa: [null, [Validators.required]],
      email: [null, [Validators.required, FormValidations.emailValidator]],
      telefone: [null, [Validators.required, FormValidations.telefoneValidator]],
      cnpj: [null, [Validators.required, FormValidations.cnpjValidator]],
      tipoPessoa: [null, [Validators.required]],
      contrato: [ null, Validators.required ],
      tipoPregao: [null, Validators.required],
      tipoProcesso: [null, Validators.required],
      tipoServico: [null, Validators.required],
      dataSolicitacao: [null, Validators.required],
      dataEntrega: [null, Validators.required],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: ["Selecione uma Cidade...", Validators.required],
        estado: ["Selecione um estado...", Validators.required],
        codMunicipio: [null, [Validators.required, Validators.minLength(7), Validators.maxLength(7)]]
      }),
      banco: this.formBuilder.group({
        nome: [null, Validators.required],
        codigo: [null, Validators.required],
        agencia: [null, Validators.required],
        conta: [null, Validators.required]
      })
    }
    );

    const id = this.route.snapshot.paramMap.get('id'); 
    if(id){
      this.crudService.readById(id).subscribe((info) => {
        this.formulario_fornecedor.patchValue(info)
      })
    }

    this.cepService.getEstadosBr().subscribe((dados) => {
      this.estados = dados;
    })

    this.formulario_fornecedor.get('endereco.estado')?.valueChanges
    .pipe(
      map(estado => this.estados.filter(v => v.sigla == estado)),
      map(estados => estados && estados.length > 0 ? estados[0].id : of({})),
      switchMap((estadoId) => this.cepService.getCidadesBr(estadoId)),
    ).subscribe(cidades => this.cidades = cidades);

    this.verificaCep()
  }

  verificaCep(){
    let cep = this.formulario_fornecedor.get('endereco.cep')
    cep?.statusChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(dados => dados == "VALID" ? this.cepService.consultarCep(cep?.value)
                .subscribe((dados: any) => {this.preencheCep(dados)
                this.preencheCodigo(dados.localidade)}): {});
  }

  changeCep(evento: any){
    // Quando o campo cep muda mas sem modificar o status do campo ou seja não se enquadra na função verificaCep()
    //Ex.: Quando o usuário cópia e cola outro cep válido
    this.cepService.consultarCep(evento?.value).subscribe((dados: any) => {this.preencheCep(dados)
      this.preencheCodigo(dados.localidade)});
  }

  preencheCep(dados: any){
    this.formulario_fornecedor.patchValue({
      endereco:{
        cep: dados.cep,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })
  }

  preencheCodigo(cidade:any){
    /*Preeche o código do município toda vez que o campo select for modificado*/
    if(cidade){
      //Se o usuário modificar manualmente após colocar o cep
      if(typeof(cidade) != 'string'){
          cidade = cidade.value
      }
      this.cepService.getCodigoBr(cidade).subscribe(
        municipio => this.formulario_fornecedor.patchValue({
          endereco:{
            codMunicipio: municipio[0].codigo
          }
        })
      )
    }
  }

  formataTel(){
    //Formata telefone para (ddd)91234-4567
    let tel = this.formulario_fornecedor.get('telefone')
    if(tel?.valid && tel){
      let digitos = tel.value.replace(/\D/g, '');
      let format = `(${digitos.slice(0, 2)})${digitos.slice(2, 7)}-${digitos.slice(7, 11)}`
      this.formulario_fornecedor.patchValue({
        telefone: format
      })
    }
  }

  formataCNPJ(){
    //Formata cnpj para 03.778.130/0001-48 
    let cnpj = this.formulario_fornecedor.get('cnpj')
    if(cnpj?.valid && cnpj){
      let digitos = cnpj.value.replace(/\D/g, '');
      let format = `${digitos.slice(0, 2)}.${digitos.slice(2, 5)}.${digitos.slice(5, 8)}/${digitos.slice(8, 12)}-${digitos.slice(12, 14)}`
      this.formulario_fornecedor.patchValue({
        cnpj: format
      })
    }
  }

  submit(){
    if(this.formulario_fornecedor.valid){
      this.crudService.update(this.formulario_fornecedor.value).subscribe(() =>
        this.router.navigate(['/fornecedor'])
        ,  (error) => {
          if(error){
            this.msgErro = error;
          }})
    }
    else{
      FormValidations.verificaValidacoesForm(this.formulario_fornecedor)
    } 
  }

  errorServer(){
    if(this.msgErro){
      return 'is-invalid';
    }
    return null;
  }


  verificaTouched(campo: any){
    return this.formulario_fornecedor.get(campo)?.touched;
  }

  mostrarErro(campo: any){
    if(this.verificaTouched(campo) || this.formulario_fornecedor.get(campo)?.dirty){
      if(!this.formulario_fornecedor.get(campo)?.valid){
        return 'is-invalid';
      }
    }
    return null;
  }

  cancel(){
    this.router.navigate(['/fornecedor']);
  }

}
