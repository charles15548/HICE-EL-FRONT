import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AudiosService } from 'src/app/services/audios.service';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-audios',
  templateUrl: './audios.component.html',
  styleUrls: ['./audios.component.css']
})
export class AudiosComponent implements OnInit {

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
    //this.obtenerAudios()
    this.initFrom()
   
  }

 
  initFrom(){
    this.formAudios = new FormGroup({
      nombre: new FormControl(null, [Validators.required]), 
      descripcion: new FormControl(null, [Validators.required]),
    }) 
  }
  
    /*
  obtenerAudios(){
    this._audioService.listarAudios()
    .subscribe((data)=>{
      this.listaAudios = data.Audio;
      console.log(data.Audio)
    },
    (error) =>{
      console.error('Error al obtener audios:', error);
    });
  }
*/
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
  eliminarAudio(id: any){
    Swal.fire({
      title: '¿Estás seguro de eliminar el audio?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result)=>{
      if (result.isConfirmed) {

        this._audioService.eliminarAudio(id)
          .subscribe((data) => {
            console.log("Audio eliminado", data)
            this.listaAudios = this.listaAudios.filter(item => item.id !== id);
          }, error => {
            console.error('Error al eliminar el audio', error);
          });

          this.alertaExitosa(" eliminado")

      }
    });
  }
    

  registrarAudio(): void{
    if(this.formAudios.valid){
     //Obtiene todo el formulario
      let audioData = {
        nombre: this.formAudios.get('nombre')?.value,
        descripcion: this.formAudios.get('descripcion')?.value,
        idPersonaje: this.idPersonaje
      };

      this.formData.append('audioParam', JSON.stringify(audioData));
     
        this._audioService.generarAudios(this.formData).subscribe(response=>{
        this.cerrarModal()
        this.obtenerAudiosPorProyectoyPersonaje(this.idProyecto,this.idPersonaje)
        this.resetForm()
        console.log('Audio Registrado',response);
      }, error =>{
        console.error('Error al registrar audios',error);
      });
    }else{
      console.log('Formulario no válido');
    }
  }
  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    if(file){
     this.audioFile = file;
     this.formData.append("audioFile",this.audioFile);
    }   
  }

    
  editarAudio(id: number):void{
    if(this.formAudios.valid){
      //Obtiene todo el formulario
      let audioData = {
        nombre: this.formAudios.get('nombre')?.value,
        descripcion: this.formAudios.get('descripcion')?.value
      };
      this.formData.append('audioParam', JSON.stringify(audioData));
      this._audioService.editarAudio(id,this.formData ).subscribe(response=>{
        this.cerrarModal()
        this.obtenerAudiosPorProyectoyPersonaje(this.idProyecto,this.idPersonaje)
        this.resetForm()
        console.log('Audio actualizado',response);
      },error=>{
        console.error('Error al modificar el audio',error);
      });
    }
  }

  titulo(titulo:any, id:number){
    this.title = `${titulo} audio`
    titulo == "Crear" ? this.nameBoton ="Guardar" : this.nameBoton = "Modificar"
    if(id!= null){
      this.id=id
      this.obtenerAudioPorId(id)
    }
  }

  crearEditarAudio(boton:any){
    if(boton =="Guardar"){
      this.alertaRegistro()
    }else{
     this.alertModificar()
    // this.formAudios.controls['audio'].setValue(this.archioAudio)
    }
  }
  cerrarModal(){
    const modalElement = document.getElementById('modalAudio');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
    this.resetForm();
  }
 
  resetForm(): void {
    this.formAudios.reset();
    this.audioFile= null;
    this.formData = new FormData();

    const fileInput = document.getElementById('audioFile') as HTMLInputElement;
    if( fileInput){
      fileInput. value = '';
    }
    
  }
  cerrarBoton(){
    this.resetForm()
    this.cerrarModal()
  }
  alertaRegistro(){
    if(this.formAudios.valid){
      Swal.fire({
        title:'¿Estás seguro de registrar el audio?',
        icon:'success',
        showCancelButton: true,
        confirmButtonText: 'Si, confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) =>{
        if(result.isConfirmed){
        this.registrarAudio()
        this.alertaExitosa("registrado")
        }
      })
    }
  }

  alertModificar(){
    if(this.formAudios.valid){
      Swal.fire({
        title: '¿Estás seguro de modificar el audio?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, modificar',
        cancelButtonText: 'Cancelar'
      }).then((result)=>{
        if(result.isConfirmed){
          this.editarAudio(this.id)
          this.alertaExitosa('modificado')
        }
      });
    }
  }
  alertaExitosa(titulo:any){
    Swal.fire({
      position:"top-end",
      icon: "success",
      title:"Audio " + titulo ,
      showConfirmButton:false,
      timer:1500
    })

  }

  logout(){
    Swal.fire({
      title:'¿Estás seguro de cerrar sesion?',
      icon:'question',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        this._loginService.logout()
        this.route.navigate(['login'])
      }
    });
  }

  
  
 
  
}
