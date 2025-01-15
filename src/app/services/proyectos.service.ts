import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  private baseUrl = environment.apiUrl

  private proyecto: string = `${this.baseUrl}/proyecto`

  constructor(private http: HttpClient) { }

  listarProyectos(): Observable<any>{
    return this.http.get(this.proyecto)
  }

  listarPorUsuario(id : number):  Observable<any>{
    return this.http.get(`${this.proyecto}/usuario/${id}`)
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
