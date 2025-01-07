import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {

  private baseUrl = environment.apiUrl

  private personaje: string = `${this.baseUrl}/personaje`

  constructor(private http: HttpClient) { }

  listarPersonajes(): Observable<any>{
    return this.http.get(this.personaje)
  }

  listarPorProyecto(id : number):  Observable<any>{
    return this.http.get(`${this.personaje}/proyecto/${id}`)
  }
  obtenerPersonajePorId(id: number): Observable<any>{
    return this.http.get(`${this.personaje}/${id}`)
  }
/*
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
