import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { requestResponse } from '../models/requestResponse';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private api = `${environment.ApiURL}/usuario`
  constructor(private http : HttpClient) { }

  Login() : Observable<requestResponse<User[]>>{
    return this.http.get<requestResponse<User[]>>(this.api)
  }

  Cadastro(user : User) : Observable<requestResponse<User[]>>{
    return this.http.post<requestResponse<User[]>>(this.api, user)
  }
}
