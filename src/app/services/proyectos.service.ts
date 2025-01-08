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
/*
  listarPorUsuario(id : number):  Observable<any>{
    return this.http.get(`${this.proyecto}/usuario/${id}`)
  }
  obtenerProyectoPorId(id: number): Observable<any>{
    return this.http.get(`${this.proyecto}/${id}`)
  }

  generarAudios(fromData: FormData): Observable<any> {
    return this.http.post(`${this.audios}`, fromData)
  }

  editarAudio(id: number, fromData: FormData): Observable<any> {
  
    return this.http.put(`${this.audios}/${id}`, fromData);
  }

  eliminarAudio(id: number): Observable<any> {
    return this.http.delete(`${this.audios}/${id}`);
  }*/
    
}
