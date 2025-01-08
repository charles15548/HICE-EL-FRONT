import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { PersonajesService } from 'src/app/services/personajes.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css']
})
export class PersonajesComponent implements OnInit {

   listaPersonajes: any[] = []
    audioFile: File | null = null;
    title: any
    nameBoton: any  
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
      this.route.navigate(['/audios', idPersonaje]);
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
  
  
  
    
}
