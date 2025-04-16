import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { User } from '../../models/User';
import { Router } from '@angular/router';


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
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
      const foundUser = this.users.find(
        user => user.email == this.loginForm.value.email && user.password == this.loginForm.value.password
      );
      console.log(foundUser)
      if (foundUser)
        alert(`Bem vindo ${foundUser.name}`)
      else
        alert('nao deu')
      this.router.navigate(['/']);
    } else {
      console.log('Form is not valid');
    }
  }
}
