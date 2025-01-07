import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AudiosService {

  private baseUrl = environment.apiUrl

  private audios: string = `${this.baseUrl}/audio`

  constructor(private http: HttpClient) { }

  listarAudios(): Observable<any>{
    return this.http.get(this.audios)
  }

  listarPorPersonaje(id : number):  Observable<any>{
    return this.http.get(`${this.audios}/personaje/${id}`)
  }
  obtenerAudioPorId(id: number): Observable<any>{
    return this.http.get(`${this.audios}/${id}`)
  }

  generarAudios(fromData: FormData): Observable<any> {
    return this.http.post(`${this.audios}`, fromData)
  }

  editarAudio(id: number, fromData: FormData): Observable<any> {
  
    return this.http.put(`${this.audios}/${id}`, fromData);
  }

  eliminarAudio(id: number): Observable<any> {
    return this.http.delete(`${this.audios}/${id}`);
  }
    
}
