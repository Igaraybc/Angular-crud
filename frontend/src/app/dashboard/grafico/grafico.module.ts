import { GraficoComponent } from './grafico.component';
import { BarComponent } from './bar/bar.component';
import { LineComponent } from './line/line.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    GraficoComponent,
    LineComponent, 
    BarComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[LineComponent]
})
export class GraficoModule { }
