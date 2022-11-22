import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent {

  @Input() chartData: { data: Array<number>[], legend: string[], xLabels: string[] } =
    {
      data: [[12, 1, 23, 33, 1, 12, 25, 45, 22, 36, 10, 8], [32, 11, 10, 20, 41, 10, 52, 5, 33, 16, 10, 5], [22, 1, 2, 32, 20, 10, 20, 15, 23, 15, 12, 35], [20, 5, 23, 45, 2, 5, 6, 16, 48, 23, 5, 15], [12, 1, 23, 52, 1, 12, 25, 45, 22, 36, 10, 8]],
      legend: ['Produto 1', 'Produto 2', 'Produto 3', 'Produto 4', 'Produto 5'],
      xLabels: ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO']
    }

  @Input() colors = ['#B8B8FF', '#7FF2CD', '#679fbb', '#FF9F40', '#F679A5', '#68BBFF',   '#89DCEB'];  

  @ViewChild('chartLine') chartLine!: ElementRef;
  data: any;
  options: any;

  ngAfterViewInit(){
    let datasets = [] 
    for(let i=0; i < this.chartData.data.length; i++){
      datasets.push({
        label: this.chartData.legend[i],
        data: this.chartData.data[i],
        borderColor: this.colors[i],
        backgroundColor : this.colors[i],
        tension: 0.25
      })
    }

    this.data = {
      labels: this.chartData.xLabels,
      datasets: datasets
    };

    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
            grid: {
              display: true,
              color: '#edf1f7',
            },
            ticks: {
              color: "#919db4" ,
            },
          },
        y:
          {
            grid: {
              display: true,
              color: '#edf1f7',
            },
            ticks: {
              color: "#919db4" ,
            },
          }
      },
      plugins:{
        legend: {
          position: 'top',
          labels: {
            fontColor: "#919db4",
          },
        }
      },
    };

    new Chart(this.chartLine?.nativeElement, {
      type: 'line', 
      data: this.data,
      options: this.options
    })

  }


}
