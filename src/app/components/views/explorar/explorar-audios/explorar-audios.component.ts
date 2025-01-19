import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AudiosService } from 'src/app/services/audios.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-explorar-audios',
  templateUrl: './explorar-audios.component.html',
  styleUrls: ['./explorar-audios.component.css']
})
export class ExplorarAudiosComponent implements OnInit {

  
    listaAudios: any[] = []
    formAudios: FormGroup
    audioFile: File | null = null;
    title: any
    nameBoton: any  
    id: number
    formData= new FormData() ;
    idPersonaje: number = +this.router.snapshot.paramMap.get('idPersonaje')!;
    idProyecto: number = +this.router.snapshot.paramMap.get('idProyecto')!;
    //idPersonaje: number = 2;
  
    constructor(
      private _audioService: AudiosService,
      private _loginService: LoginService,
      private route: Router,
      private router: ActivatedRoute,
    ) { }
  
    ngOnInit(): void {
    
      this.obtenerAudiosPorProyectoyPersonaje(this.idProyecto, this.idPersonaje)
      
    }
  
   
    
    obtenerAudiosPorProyectoyPersonaje(idProyecto: number, idPersonaje: number){
      this._audioService.listarPorProyectoYPersonaje(idProyecto,idPersonaje)
      .subscribe((data)=>{
        this.listaAudios = data.Audio;
        console.log(data.Audio);
       if(this.listaAudios.length==0){
          console.log("No hay audios con dicho proyecto y personaje");
        }
      }, (error)=>{
        console.error('Error al obtener audios por proyecto y personaje', error);
      });
    }
   
      
      
    
      
    obtenerAudioPorId(id:any){
      let form = this.formAudios
      this._audioService.obtenerAudioPorId(id).subscribe((data)=>{
       // form.controls['audio'].setValue(data.Audios.audio)
        form.controls['nombre'].setValue(data.Audio.nombre)
        form.controls['descripcion'].setValue(data.Audio.descripcion)
  
        this.audioFile=null;
        
      });
  
      
    }
    
  
    
   
    
}
