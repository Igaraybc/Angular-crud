import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateFornecedorComponent } from './create-fornecedor/create-fornecedor.component';
import { DeleteFornecedorComponent } from './delete-fornecedor/delete-fornecedor.component';
import { UpdateFornecedorComponent } from './update-fornecedor/update-fornecedor.component';
import { ReadFornecedorComponent } from './read-fornecedor/read-fornecedor.component';
import { FornecedorComponent } from './fornecedor.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBaseModule } from '../../form-base/form-base.module';
import { FornecedorRoutingModule } from './fornecedor-routing.module';
import { PaginationComponent } from 'src/app/pagination/pagination.component';

@NgModule({
  declarations: [
    FornecedorComponent,
    CreateFornecedorComponent,
    DeleteFornecedorComponent,
    UpdateFornecedorComponent,
    ReadFornecedorComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FormBaseModule,
    FornecedorRoutingModule
  ],
  exports:[FornecedorComponent, PaginationComponent]
})
export class FornecedorModule { }
