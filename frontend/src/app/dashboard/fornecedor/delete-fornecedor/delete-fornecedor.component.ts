import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FornecedorService } from '../../../services/fornecedor.service';

@Component({
  selector: 'app-delete-fornecedor',
  templateUrl: './delete-fornecedor.component.html',
  styleUrls: ['./delete-fornecedor.component.css']
})
export class DeleteFornecedorComponent implements OnInit {

  classModal = "open";
  modal: boolean = true;
  fornecedor: any;
  @Input() id: any;
  @Input() nomeEmpresa: String = 'Fornecedor';
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private crudService: FornecedorService) { }

  ngOnInit(): void {
  }

  submit() {
    this.crudService.delete(this.id).subscribe(() => {
      this.modal = false;
      this.closeModal.emit(true);   
    })
  }

  cancel() {
    this.classModal = "close";
    setTimeout(()=>{
      this.closeModal.emit(true);
      this.modal = false;
    }, 280);
   
  }

}
