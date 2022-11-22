import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Chart  from 'chart.js/auto';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent {
  @Input() chartData: { data: Array<number>[], legend: string[], xLabels: string[] } = {
    data: [[12, 1, 23, 33, 1, 12, 25, 45, 22, 36, 10, 8], [32, 11, 10, 20, 41, 10, 52, 5, 33, 16, 10, 5], [22, 1, 2, 32, 20, 10, 20, 15, 23, 15, 12, 35], [20, 5, 23, 45, 2, 5, 6, 16, 48, 23, 5, 15], [12, 1, 23, 52, 1, 12, 25, 45, 22, 36, 10, 8]],
    legend: ['Produto 1', 'Produto 2', 'Produto 3', 'Produto 4', 'Produto 5'],
    xLabels: ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO']
  }

  //Array de cores para cada conjunto de dados
  @Input() colors =  ['#B8B8FF', '#7FF2CD', '#679fbb', '#F679A5', '#68BBFF', '#FF9F40',  '#89DCEB']; 
  
  //Interligando com o elemento que está no html com #, no caso #chartBar
  @ViewChild('chartBar') chartBar!: ElementRef;
  data: any;
  options: any;

  mes1 = 0;
  mes2 = 12;
  chart: any;

  ngAfterViewInit(){
    
    let datasets = [] 
    for(let i=0; i < this.chartData.data.length; i++){
      datasets.push({
        label: this.chartData.legend[i],
        data: this.chartData.data[i].slice(this.mes1, this.mes2+1),
        backgroundColor: this.colors[i]
      })
    }

    /*
      Padrão chart.js
      data = {
        labels: (xLabels),
        datasets: (Dados do gráfico){
          label: (legenda),
          backgroundColor: (Cor de fundo),
          borderColor: (Cor da borda),
          data: (dados para cada label do eixo x) [...]
        },
      } 
    */

    this.data = {
      labels: this.chartData.xLabels.slice(this.mes1, this.mes2+1),
      datasets: datasets
    };
  
    this.options = {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          labels: {
            fontColor: "#919db4",
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            stepSize: 10,
            color: "#919db4",
          },
        },
        y:
        {
          grid: {
            display: true,
            color: '#edf1f7',
          },
          ticks: {
            stepSize: 10,
            color: "#919db4",
          },
        }
      },
    }

    this.chart = new Chart(this.chartBar?.nativeElement, {
      type: 'bar', 
      data: this.data,
      options: this.options
    })
  }

  onChangeSelect(target: any){ 
    let xLabels = this.chartData.xLabels 
    if(target.name == "mes1"){
      this.mes1 = xLabels.indexOf(target.value)
    }
    else if(target.name == "mes2"){
      this.mes2 = xLabels.indexOf(target.value)
    }
  }

  onClick(){
    let bar = Chart.getChart(this.chart);
    bar?.destroy()
    this.ngAfterViewInit()
  }
}
