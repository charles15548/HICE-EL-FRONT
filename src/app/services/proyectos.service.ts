import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  private baseUrl = environment.apiUrl

  private proyecto: string = `${this.baseUrl}/proyecto`

  constructor(private http: HttpClient, private _loginService: LoginService) { }

  listarProyectos(): Observable<any>{
    return this.http.get(this.proyecto)
  }

  listarProyectoPorIdUsuario():  Observable<any>{
    const token = this._loginService.token();
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get(`${this.proyecto}/usuario`,{headers});
  }
  obtenerProyectoPorId(id: number): Observable<any>{
    return this.http.get(`${this.proyecto}/${id}`)
  }

  generarProyecto(fromData: FormData): Observable<any> {
    return this.http.post(`${this.proyecto}`, fromData)
  }

  editar(id: number, fromData: FormData): Observable<any> {
  
    return this.http.put(`${this.proyecto}/${id}`, fromData);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.proyecto}/${id}`);
  }
    
}
