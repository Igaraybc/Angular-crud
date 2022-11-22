import { Component, Input, OnInit } from '@angular/core';
import { Fornecedor } from 'src/app/models/fornecedor';
import { FornecedorService } from '../../../services/fornecedor.service';

@Component({
  selector: 'app-read-fornecedor',
  templateUrl: './read-fornecedor.component.html',
  styleUrls: ['./read-fornecedor.component.css']
})
export class ReadFornecedorComponent implements OnInit {
  fornecedores: any;

  fetchedData:Fornecedor[] = [];
  displayedData: Fornecedor[] = [];
  allPages: number = 0;
  itemsPerPage: number = 7;

  search: String = '';

  openModal: boolean = false;
  deleteId: any;
  deleteName: String = '';

  constructor(private crudService: FornecedorService) { }

  ngOnInit(): void {
    this.read();
  }

  read(){
    this.crudService.read().subscribe((info) => {
      this.fornecedores = info
      this.fetchedData = info;
      this.onPageChange();
      this.allPages = Math.ceil(this.fetchedData.length / this.itemsPerPage );
    })
  }

  readWithSearch(){
    return this.crudService.search(this.fornecedores, this.search);
  }

  
  onPageChange(page: number = 1): void{
    const startItem = (page-1) *this.itemsPerPage;
    const endItem = page*this.itemsPerPage;
    this.displayedData = this.fetchedData?.slice(startItem, endItem);
  }
  
  onItemsPerPage(numberItems:any){
    this.itemsPerPage = numberItems;
    this.allPages = Math.ceil(this.fetchedData.length / this.itemsPerPage );
    this.onPageChange();
  }

  onSearch(){
    if(this.search){
      if(this.search.length > 0){
        this.fetchedData = this.readWithSearch(); //Busca
        this.allPages = Math.ceil(this.fetchedData.length / this.itemsPerPage ); //Atualização da quantidade de páginas no total
        this.onPageChange();
      }
    }
    else{
      this.fetchedData = this.fornecedores;
      this.allPages = Math.ceil(this.fetchedData?.length / this.itemsPerPage );
      this.onPageChange();
    }
  }

  modal(id: any, nome: String){
    this.openModal = !this.openModal;
    this.deleteId = id;
    this.deleteName = nome;
  }

  closeModal(close: boolean){
    if(close){
      this.openModal = false;
      this.read();
    }
  }

}
