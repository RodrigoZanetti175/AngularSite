import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  hasId: boolean = false;
  users : User[] = []

  constructor(private userService : UsuarioService){}

  ngOnInit() {
    if(this.hasId = !!localStorage.getItem('id'))
    {
      this.userService.Login().subscribe(response=>{
        if(!response.sucesso){
          alert(response.mensagem)
          return 
        }
        this.users = response.dados
      })
    }
  }
}
