import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegistro: FormGroup;
  paso = 1; // Paso actual del formulario
  usuarioFile:File | null = null;
  formData = new FormData();
  listaPaises = [
    { idPais: 1, nombre: 'Perú' },
    { idPais: 2, nombre: 'México' },
    { idPais: 3, nombre: 'Colombia' },
  ];

  constructor(
    private usuarioService: UsuariosService,
    private route: Router,
  ){}

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.formRegistro = new FormGroup({
      nombre: new FormControl(null,[Validators.required]),
      apellidoPaterno: new FormControl(null,[Validators.required]),
      apellidoMaterno: new FormControl(null,[Validators.required]),

      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),

      edad: new FormControl(null,[Validators.required]),
      genero: new FormControl(null,[Validators.required]),
      idPais: new FormControl(null,[Validators.required]),
      idDepartamento: new FormControl(null,[Validators.required]),
    })
  }

  cambiarPaso(nuevoPaso: number): void {
    if (nuevoPaso < 1 || nuevoPaso > 3) return; // Validar rangos de pasos
    this.paso = nuevoPaso;
  }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    if(file){
     this.usuarioFile = file;
     this.formData.append("usuarioFile",this.usuarioFile);
    }   
  }
  registrarUsuario(): void {
    if (this.formRegistro.valid) {
      let usuarioData ={
        nombre: this.formRegistro.get('nombre')?.value,
        apellidoPaterno: this.formRegistro.get('apellidoPaterno')?.value,
        apellidoMaterno: this.formRegistro.get('apellidoMaterno')?.value,

        email: this.formRegistro.get('email')?.value,
        password: this.formRegistro.get('password')?.value,

        edad: this.formRegistro.get('edad')?.value,
        genero: this.formRegistro.get('genero')?.value,
        idPais: this.formRegistro.get('idPais')?.value,
        idDepartamento: this.formRegistro.get('idDepartamento')?.value
      }
      this.formData.append('usuarioParam', JSON.stringify(usuarioData));

      this.usuarioService.crearUsuario(this.formData).subscribe(
        response => {
          this.resetForm()
          this.route.navigate(['proyectos'])
          console.log('Registrado', response);
        },error => {
          console.error('Error al registrar usuario:', error);
        });
    } else {
      alert('Completa todos los campos.');
    }
  }
  resetForm():void{
    this.formRegistro.reset();
    this.usuarioFile=null;
    this.formData= new FormData();
    const fileInput = document.getElementById('usuarioFile') as HTMLInputElement;
    if(fileInput){
      fileInput.value ='';
    }
  }
  
}

