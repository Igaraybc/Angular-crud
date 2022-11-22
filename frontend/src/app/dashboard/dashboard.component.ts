import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  className: string = 'dashboard';
  only_icon: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  changeDashboard(evento: boolean){
    if(evento){
      this.className = 'dashboard-only-icon';
      this.only_icon = true;
    }
    if(!evento){
      this.className = 'dashboard';
      this.only_icon = false;
    }
  }

}
