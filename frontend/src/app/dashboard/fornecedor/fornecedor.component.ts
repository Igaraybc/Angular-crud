import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fornecedor',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit {
  
  searchText: string = '';
  
  ngOnInit(): void {
    
  }

}
