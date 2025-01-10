import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProyectosService } from 'src/app/services/proyectos.service';
import Swal from 'sweetalert2';
declare var bootstrap: any;
@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  listaProyectos: any[] =[]
  proyectoFile : File | null= null;
  formProyecto:FormGroup
  title:any
  nameBoton: any
  id: number
  formData= new FormData();


  constructor( 
    private _proyectosService: ProyectosService,
    private route: Router,){} 

  ngOnInit(): void {
    this.obtenerProyectos()
    this.initForm()
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

  obtenerProyectos(){
    this._proyectosService.listarProyectos()
    .subscribe((data)=>{
      this.listaProyectos = data.Proyecto;
      console.log(data.Proyecto)
    },(error)=>{
      console.error('Error al obtener proyectos: ', error);
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

  titulo(titulo:any, id:number){
    this.title = `${titulo} proyecto`
    titulo == "Crear" ? this.nameBoton= "Guardar" : this.nameBoton = "Modificar"

    if(id!= null){
      this.id = id
      // this.obtenerProyectosPorId(id)
    }
  }

  crearEditarProyecto(boton:any){
    if(boton == "Guardar"){
      this.alertaRegistro()
    }else{

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
