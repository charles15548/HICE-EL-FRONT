import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router';
import { PersonajesService } from 'src/app/services/personajes.service';
import Swal from 'sweetalert2';
declare var bootstrap: any;
@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css']
})
export class PersonajesComponent implements OnInit {

   listaPersonajes: any[] = []
    formPersonaje: FormGroup
    personajeFile: File | null = null;
    title: any
    nameBoton: any  
    id: number
    formData = new FormData();
    idProyecto : number = +this.router.snapshot.paramMap.get('idProyecto')!;

    constructor(
      private _personajesService: PersonajesService,
      private route: Router,
      private router: ActivatedRoute,
    ) { }
  
    ngOnInit(): void {
      this.initForm()
      this.obtenerPorProyecto(this.idProyecto)
      
    }
    initForm(){
         this.formPersonaje = new FormGroup({
              nombre: new FormControl(null, [Validators.required]), 
              descripcion: new FormControl(null, [Validators.required]),
            })
      }
    
    verAudios(idPersonaje: number) {
      this.route.navigate(['/proyectos', this.idProyecto,'personajes', idPersonaje,'audios']);
    }
    obtenerPersonajes(){
      this._personajesService.listarPersonajes()
      .subscribe((data)=>{
        this.listaPersonajes = data.Personaje;
        console.log(data.Personaje)
      },(error)=>{
        console.error('Error al obtener personaje: ', error);
      });
    }
     
    obtenerPorProyecto(idProyecto: number){
      this._personajesService.listarPorProyecto(idProyecto)
      .subscribe((data)=>{
        this.listaPersonajes = data.Personaje;
        console.log(data.Personaje)
      },
      (error) =>{
        console.error('Error al obtener personajes:', error);
      });
    }
    obtenerPersonajePorId(id:any){
      let form = this.formPersonaje
      this._personajesService.obtenerPersonajePorId(id).subscribe((data)=>{
        form.controls['nombre'].setValue(data.Personaje.nombre)
        form.controls['descripcion'].setValue(data.Personaje.descripcion)
  
        this.personajeFile=null;
      })
    }
  
  
    eliminarPersonaje(id: any){
        Swal.fire({
          title: '¿Estás seguro de eliminar el personaje?',
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
        }).then((result)=>{
          if(result.isConfirmed){
            this._personajesService.eliminarPersonaje(id)
            .subscribe((data)=>{
              console.log("Personaje eliminado", data)
              this.listaPersonajes = this.listaPersonajes.filter(item => item.id !==id);
    
            },error=>{
              console.error('Error al eliminar personaje', error);
            });
            this.alertaExitosa("Eliminado")
          }
        });
      }
      registrarPersonaje(): void{
        if(this.formPersonaje.valid){
          let personajeData={
            nombre: this.formPersonaje.get('nombre')?.value,
            descripcion: this.formPersonaje.get('descripcion')?.value,
            idProyecto: this.idProyecto
          }
          this.formData.append('personajeParam', JSON.stringify(personajeData));
    
            this._personajesService.generarPersonaje(this.formData).subscribe(response=>{
              this.cerrarModal()
              this.obtenerPersonajes()
              this.resetForm()
              console.log('Proyecto Registrado', response);
            }, error =>{
              console.error('Error al registrar Proyecto',error);
            });
        }else{
          console.log('Formulario no válido');
        }
      }
      onFileSelected(event: any){
        const file:File = event.target.files[0];
        if(file){
          this.personajeFile = file;
          this.formData.append("personajeFile", this.personajeFile);
        }
    
      }

      editPersonaje(id: number):void{
        if(this.formPersonaje.valid){
          //Obtiene todo el formulario
          let personajeData={
            nombre: this.formPersonaje.get('nombre')?.value,
            descripcion: this.formPersonaje.get('descripcion')?.value,
            idProyecto: this.idProyecto
          }
          this.formData.append('personajeParam', JSON.stringify(personajeData));
    
            this._personajesService.editarPersonaje(id,this.formData ).subscribe(response=>{
            this.cerrarModal()
            this.obtenerPersonajes()
            this.resetForm()
            console.log('Actualizado correctamente',response);
          },error=>{
            console.error('Error en la modificación',error);
          });
        }
      }
      titulo(titulo:any, id:number){
        this.title = `${titulo} personaje`
        titulo == "Crear" ? this.nameBoton= "Guardar" : this.nameBoton = "Modificar"
    
        if(id!= null){
          this.id = id
          this.obtenerPersonajePorId(id)
        }
      }

      crearEditarPersonaje(boton:any){
        if(boton == "Guardar"){
          this.alertaRegistro()
        }else{
          this.alertModificar()
        }
      }
      cerrarModal(){
        const modalElement = document.getElementById('modalPersonaje');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        this.resetForm();
      }
      resetForm():void{
        this.formPersonaje.reset();
        this.personajeFile= null;
        this.formData = new FormData;
    
        const fileInput = document.getElementById('personajeFile') as HTMLInputElement;
        if(fileInput){
          fileInput.value='';
        }
      }
      cerrarBoton(){
        this.resetForm()
        this.cerrarModal()
      }
    
      alertaRegistro(){
            if(this.formPersonaje.valid){
              Swal.fire({
                title:'¿Estás seguro de registrar el personaje?',
                icon:'success',
                showCancelButton: true,
                confirmButtonText: 'Si, confirmar',
                cancelButtonText: 'Cancelar'
              }).then((result) =>{
                if(result.isConfirmed){
                this.registrarPersonaje()
                this.alertaExitosa("registrado")
                }
              })
            }
          }
      
           alertModificar(){
              if(this.formPersonaje.valid){
                Swal.fire({
                  title: '¿Estás seguro de modificar el Personaje?',
                  icon: 'question',
                  showCancelButton: true,
                  confirmButtonText: 'Sí, modificar',
                  cancelButtonText: 'Cancelar'
                }).then((result)=>{
                  if(result.isConfirmed){
                    this.editPersonaje(this.id)
                    this.alertaExitosa('modificado')
                  }
                });
              }
            }
          alertaExitosa(titulo:any){
              Swal.fire({
                position:"top-end",
                icon: "success",
                title:"Proyecto " + titulo ,
                showConfirmButton:false,
                timer:1500
              })
          
            }
    
}
