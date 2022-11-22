import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  show: boolean = false;
  
  constructor(public authService: AuthService,
    private router: Router){}

  ngOnInit(){}

  logout(){
    this.router.navigate(['/login']);
    this.authService.logout();
  }

  showDropdown(){
    if(this.show){
      return 'show';
    }
    return 'hide';
  }

  clickDropdown(){
    this.show = !this.show;
    return this.show;
  }

  iconMenu(){
    if(this.show){
      return 'fa-times';
    }
    return 'fa-bars';
  }

  closeDropdown(){
    this.show = false;
  }

}
