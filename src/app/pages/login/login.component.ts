import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { User } from '../../models/User';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  users : User[] = [];

  constructor(private fb: FormBuilder, private userService: UsuarioService, private router : Router) {
    // Initialize the form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],  // Username control with validation
      password: ['', [Validators.required, Validators.minLength(4)]],  // Password control with validation
    });
  }
  ngOnInit(): void {
    this.userService.Login().subscribe(response=>{
      if(!response.sucesso)
      {
        alert(response.mensagem)
        return
      }
      this.users = response.dados
      console.log(this.users)
    })
  }

  // Function to handle the form submission
  onSubmit(): void {
    const hashedPassword = CryptoJS.SHA256(this.loginForm.value.password).toString(CryptoJS.enc.Base64)
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
      const foundUser = this.users.find(
        user => user.email == this.loginForm.value.email && user.password == hashedPassword
      );
      console.log(foundUser)
      if (foundUser){
        localStorage.setItem('id', foundUser.id.toString())
        alert(`Bem vindo ${foundUser.name}`)
      }
      else
        alert('nao deu')
      this.router.navigate(['/']);
    } else {
      console.log('Form is not valid');
    }
  }
}
