import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  only_icon= false;
  @Output() changeMenu = new EventEmitter<boolean>();
  classIcon = "fa-arrow-left";
  @Output() openDropdown = new EventEmitter<boolean>();
  @Input() show: boolean = false; //mostrar dropdown menu
  user: Usuario = {nome: '', email: ''}; //carregar informações do usuário nessa variável

  constructor(private router: Router,
    public authService: AuthService) { }

  ngOnInit(): void {
    var value = localStorage.getItem('user');
  
      if (!value) {console.log('deu erro')}
      else if (value[0] === "{") {
        this.user = JSON.parse(value);
      }
  }

  iconOnly(){
    this.only_icon = !this.only_icon;
    this.classIcon = this.only_icon? "fa-arrow-right" : "fa-arrow-left"
    this.changeMenu.emit(this.only_icon);
    return this.only_icon;
  }    

  logout(){
    this.router.navigate(['/login']);
    this.authService.logout();
  }

  showDropdown(){ 
    if(this.show){
      this.openDropdown.emit(true);
      return 'show';
    }
    this.openDropdown.emit(false);
    return 'hide';
  }

  clickDropdown(){
    this.show = !this.show;
    return this.show;
  }

  closeDropdown(){
    this.show = false;
  }

}
