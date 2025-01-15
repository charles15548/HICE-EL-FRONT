import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private baseUrl = environment.apiUrl

  private usuario: string = `${this.baseUrl}/usuario`

  constructor(private http: HttpClient,private _loginService: LoginService) { }

  listarUsuario(): Observable<any>{
    return this.http.get(this.usuario)
  }

  listarUsuarioLogueado():  Observable<any>{
    const token = this._loginService.token();
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get(`${this.usuario}/logueado`,{headers});
  }
 
}
