import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/User';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  cadastroForm: FormGroup;

  users : User[] = [];
  newUser : User = {
    id : 0,
    name : '',
    email : '',
    password : '',
    dataDeCriacao : '',
    dataDeAlteracao : ''
  }

  constructor(private fb: FormBuilder, private userService: UsuarioService, private router : Router) {
    // Initialize the form
    this.cadastroForm = this.fb.group({
      nome:['',[Validators.required]],
      email: ['', [Validators.required]],  // Username control with validation
      password: ['', [Validators.required, Validators.minLength(4)]],  // Password control with validation
    });
  }

  

  onSubmit() : void{
      this.newUser.name = this.cadastroForm.value.nome
      this.newUser.email = this.cadastroForm.value.email
      this.newUser.password = CryptoJS.SHA256(this.cadastroForm.value.password).toString(CryptoJS.enc.Base64)
      this.userService.Cadastro(this.newUser).subscribe(response=>{
        if(!response.sucesso)
          alert(response.mensagem)
        else{
          this.users = response.dados
          console.log(this.users)
          this.router.navigate(['/login'])
        }
      })
  }
}
