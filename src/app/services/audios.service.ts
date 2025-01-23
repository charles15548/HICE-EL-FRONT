import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  listarPorProyectoYPersonaje(idProyecto : number, idPersonaje):  Observable<any>{
    return this.http.get(`${this.audios}/proyecto/${idProyecto}/personaje/${idPersonaje}`)
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
    

  /* Footer audio */
  
  private currentAudioSubject = new BehaviorSubject<any>(null);
 // private audioElement: HTMLAudioElement;

  setCurrentAudio(audio: any) {
/*
    if (this.audioElement && this.audioElement.src === audio.url) {
      
      if (this.audioElement.paused) {
        this.audioElement.play();
      }
      return;
    }

    if(this.audioElement){
      this.audioElement.pause();
      this.audioElement.currentTime=0;
    }
    */
    this.currentAudioSubject.next(audio);
    //this.playAudio(audio.url);
  }

  getCurrentAudio() {
    return this.currentAudioSubject.asObservable();
  }
 /*
  private playAudio(url: string): void {
    // Si no existe una instancia de audioElement, la creamos
    if (!this.audioElement) {
      this.audioElement = new Audio(url);
      this.audioElement.load();  // Cargar el audio
    } else {
      // Si ya existe, solo actualizamos la fuente y recargamos
      this.audioElement.src = url;
    }

    // Reproducir el audio
    this.audioElement.play().catch((error) => {
      console.error('Error al reproducir el audio:', error);
    });
  }*/
}
