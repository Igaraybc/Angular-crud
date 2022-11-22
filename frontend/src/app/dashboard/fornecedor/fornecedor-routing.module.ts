
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFornecedorComponent } from './create-fornecedor/create-fornecedor.component';
import { DeleteFornecedorComponent } from './delete-fornecedor/delete-fornecedor.component';
import { FornecedorComponent } from './fornecedor.component';
import { FornecedorResolver } from './fornecedor.resolver';
import { ReadFornecedorComponent } from './read-fornecedor/read-fornecedor.component';
import { UpdateFornecedorComponent } from './update-fornecedor/update-fornecedor.component';

const routes: Routes = [
    {
        path: "",
        component: FornecedorComponent,
        children:[  
            {
                path: "",
                component: ReadFornecedorComponent
            }, 
        {
            path: "create",
            component: CreateFornecedorComponent
        },
        {
            path: "edit/:id",
            component: UpdateFornecedorComponent
        }
    ]}
   ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class FornecedorRoutingModule {}
  