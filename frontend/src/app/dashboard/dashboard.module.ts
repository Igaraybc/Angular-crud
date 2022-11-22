import { GraficoModule } from './grafico/grafico.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { NavbarComponent } from '../navbar/navbar.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    ProfileComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DashboardRoutingModule,
    HttpClientModule,
    FornecedorModule,
    GraficoModule],
  exports:[DashboardComponent]
})
export class DashboardModule { }
