import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonajesService } from 'src/app/services/personajes.service';

@Component({
  selector: 'app-explorar-personajes',
  templateUrl: './explorar-personajes.component.html',
  styleUrls: ['./explorar-personajes.component.css']
})
export class ExplorarPersonajesComponent implements OnInit {

  
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
       
        this.obtenerPorProyecto(this.idProyecto)
        
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
    
    
     
       
      

}
