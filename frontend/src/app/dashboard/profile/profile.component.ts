
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: Usuario = {nome: '', email: ''};
  
  constructor() { }

  ngOnInit(): void {
      var value = localStorage.getItem('user');
  
      if (!value) {console.log('deu erro')}
      else if (value[0] === "{") {
        this.user = JSON.parse(value);
      }
      
  }

}
