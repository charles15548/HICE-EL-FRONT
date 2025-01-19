import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
declare var bootstrap: any;
@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  listaProyectos: any[] =[]
  formProyecto:FormGroup
  proyectoFile : File | null= null;
  title:any
  nameBoton: any
  id: number
  formData= new FormData();


  constructor( 
    private _proyectosService: ProyectosService,
    private _usuariosService: UsuariosService,
    private route: Router,){} 

  ngOnInit(): void {
    this.initForm()
    this.obtenerProyectos()
    this.obtenerUsuarioPorLogueado()
   
  }

  initForm(){
     this.formProyecto = new FormGroup({
          nombre: new FormControl(null, [Validators.required]), 
          descripcion: new FormControl(null, [Validators.required]),
        })
  }
  verPersonajes(idProyecto: number){
    this.route.navigate(['/personajes',idProyecto])
  }
  obtenerUsuarioPorLogueado(){
    this._usuariosService.listarUsuarioLogueado()
    .subscribe((data)=>{
      console.log(data.Usuario)
    },(error)=>{
      console.error('Error al obtener Usuario',error);
    });
  }

  obtenerProyectos(){
    this._proyectosService.listarProyectos()
    .subscribe((data)=>{
      this.listaProyectos = data.Proyecto;
      console.log(data.Proyecto)
    },(error)=>{
      console.error('Error al obtener proyectos: ', error);
    });
  }
  obtenerProyectoPorId(id:any){
    let form = this.formProyecto
    this._proyectosService.obtenerProyectoPorId(id).subscribe((data)=>{
      form.controls['nombre'].setValue(data.Proyecto.nombre)
      form.controls['descripcion'].setValue(data.Proyecto.descripcion)

      this.proyectoFile=null;
    })
  }

  eliminarProyecto(id: any){
    Swal.fire({
      title: '¿Estás seguro de eliminar el proyecto?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        this._proyectosService.eliminar(id)
        .subscribe((data)=>{
          console.log("Audio eliminado", data)
          this.listaProyectos = this.listaProyectos.filter(item => item.id !==id);

        },error=>{
          console.error('Error al eliminar proyecto', error);
        });
        this.alertaExitosa("Eliminado")
      }
    });
  }

  registrarProyecto(): void{
    if(this.formProyecto.valid){
      let proyectoData={
        nombre: this.formProyecto.get('nombre')?.value,
        descripcion: this.formProyecto.get('descripcion')?.value
      }
      this.formData.append('proyectoParam', JSON.stringify(proyectoData));

        this._proyectosService.generarProyecto(this.formData).subscribe(response=>{
          this.cerrarModal()
          this.obtenerProyectos()
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
      this.proyectoFile = file;
      this.formData.append("proyectoFile", this.proyectoFile);
    }

  }

  editarProyecto(id: number):void{
    if(this.formProyecto.valid){
      //Obtiene todo el formulario
      let audioData = {
        nombre: this.formProyecto.get('nombre')?.value,
        descripcion: this.formProyecto.get('descripcion')?.value
      };
      this.formData.append('proyectoParam', JSON.stringify(audioData));
      this._proyectosService.editar(id,this.formData ).subscribe(response=>{
        this.cerrarModal()
        this.obtenerProyectos()
        this.resetForm()
        console.log('Actualizado correctamente',response);
      },error=>{
        console.error('Error en la modificación',error);
      });
    }
  }
  titulo(titulo:any, id:number){
    this.title = `${titulo} proyecto`
    titulo == "Crear" ? this.nameBoton= "Guardar" : this.nameBoton = "Modificar"

    if(id!= null){
      this.id = id
      this.obtenerProyectoPorId(id)
    }
  }

  crearEditarProyecto(boton:any){
    if(boton == "Guardar"){
      this.alertaRegistro()
    }else{
      this.alertModificar()
    }
  }
  cerrarModal(){
    const modalElement = document.getElementById('modalProyecto');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
    this.resetForm();
  }
  resetForm():void{
    this.formProyecto.reset();
    this.proyectoFile= null;
    this.formData = new FormData;

    const fileInput = document.getElementById('proyectoFile') as HTMLInputElement;
    if(fileInput){
      fileInput.value='';
    }
  }
  cerrarBoton(){
    this.resetForm()
    this.cerrarModal()
  }

  alertaRegistro(){
      if(this.formProyecto.valid){
        Swal.fire({
          title:'¿Estás seguro de registrar el proyecto?',
          icon:'success',
          showCancelButton: true,
          confirmButtonText: 'Si, confirmar',
          cancelButtonText: 'Cancelar'
        }).then((result) =>{
          if(result.isConfirmed){
          this.registrarProyecto()
          this.alertaExitosa("registrado")
          }
        })
      }
    }

     alertModificar(){
        if(this.formProyecto.valid){
          Swal.fire({
            title: '¿Estás seguro de modificar el Proyecto?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, modificar',
            cancelButtonText: 'Cancelar'
          }).then((result)=>{
            if(result.isConfirmed){
              this.editarProyecto(this.id)
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
