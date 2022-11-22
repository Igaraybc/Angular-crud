import { AbstractControl, FormControl, FormGroup } from "@angular/forms";

export class FormValidations {

  static matchesEmail(form: AbstractControl){
    return form.get('email')?.value == form.get('confirmarEmail')?.value ? null : {equalsToEmail: true};
  }

  static matchesPassword(form: AbstractControl){
    return form.get('senha')?.value == form.get('confirmarSenha')?.value ? null : {equalsToPass: true};
  }

  static emailValidator(control: FormControl) {
    let email = control.value;

    if (email && email !== '') {
      const validaemail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
      return validaemail.test(email) ? null : { emailInvalido: true };
    }
    return null;
  }

  static cepValidator(control: FormControl) {
    let cep = control.value;
    if (cep && cep !== '') {
      const validacep = /[0-9]{5}-?[0-9]{3}/;
      //Se o test for valido retorna nulo porque significa que o valor está válido;
      return validacep.test(cep) ? null : { cepInvalido: true };
    }

    return null;
  }

  static cpfValidator(control: FormControl){
    let cpf = control.value;
    if(cpf && cpf !== ''){
      cpf = cpf.replace(/\D/g, '');
      const validacpf = /^[0-9]{11}$/;
      if(validacpf.test(cpf)){
        let soma = 0;
        let p = 10;
        for(let i = 0; i < 9; i++){
          soma += cpf[i]*p;
          p--;
        }
        let resto1 = 11-(soma%11) >= 10? 0: 11-(soma%11);
        let resto2 = 0;
        if(resto1 == cpf[9]){
          p = 11;
          soma = 0;
          for(let i = 0; i < 10; i++){
            soma += cpf[i]*p;
            console.log()
            p--;
          }
          resto2 = 11-(soma%11) >= 10? 0: 11-(soma%11);
        }
        if(resto1 == cpf[9] && resto2 == cpf[10]){
          return null
        }
        else{
          return {cpfInvalido: true}
        }
      }
      else{
        return {cpfInvalido: true};
      }
    }
    return null;
  }

  static cnpjValidator(control: FormControl) {
    let cnpj = control.value;
    if (cnpj && cnpj !== '') {
      cnpj = cnpj.replace(/[^\d]+/g, '');

      if (cnpj == '') return { cnpjInvalido: true };

      if (cnpj.length != 14)
        return { cnpjInvalido: true }

      // Elimina CNPJs invalidos conhecidos
      if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return { cnpjInvalido: true };

      // Valida DVs
      let tamanho = cnpj.length - 2
      let numeros = cnpj.substring(0, tamanho);
      let digitos = cnpj.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
          pos = 9;
      }
      let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(0))
        return { cnpjInvalido: true };

      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
          pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(1))
        return { cnpjInvalido: true };
    }
    return null;

  }

  static telefoneValidator(control: FormControl){
    let telefone = control.value;
    if(telefone && telefone !== ''){
      const validaTel =  /[(]?[0-9]{2}[)]?[0-9]{5}-?[0-9]{4}/;
      let digitos = telefone.replace(/[^\d]+/g, '');
      if(validaTel.test(telefone) && digitos.length == 11){
        return null;
      }
    }
    return {telInvalido: true}
  }

  static verificaValidacoesForm(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach((campo) => {
      const controle = formGroup.get(campo);
      controle?.markAsDirty();
      controle?.markAsTouched();
      if(controle instanceof FormGroup){
        this.verificaValidacoesForm(controle);
      }
    });
  }


  static getErrorMsg(validatorName: string) {
    const config: any = {
      'required': `Campo obrigatório.`,
      'emailExistente': 'Esse email já existe.',
      'emailInvalido': 'Email inválido.',
      'cnpjInvalido': 'CNPJ inválido',
      'cepInvalido': 'Cep Inválido.',
      'cpfInvalido': 'CPF inválido',
      'telInvalido': 'Telefone inválido.',
      'equalsToEmail': `Os emails não são iguais.`,
      'equalsToPass':`As senhas não são iguais`,
      'minlength': 'A senha deve conter no mínimo 8 caracteres.',
      'maxlength': 'O código deve conter 7 dígitos.'

    }
    return config[validatorName];
  }

}