import { GraficoComponent } from './grafico/grafico.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth-guard.guard';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: "",
  component: DashboardComponent,
  canActivate: [AuthGuard],
  children:[
    {path: "profile",
    component: ProfileComponent
    },
    {
    path: "fornecedor",
    loadChildren: () => import('./fornecedor/fornecedor.module').then(m => m.FornecedorModule),
    canActivate: [AuthGuard]
  },
  {
    path: "grafico",
    component: GraficoComponent,  
    canActivate: [AuthGuard]
  }
 ],
}
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
