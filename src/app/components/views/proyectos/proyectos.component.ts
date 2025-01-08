import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  listaProyectos: any[] =[]

  constructor( 
    private _proyectosService: ProyectosService,
    private route: Router,){} 

  ngOnInit(): void {
    this.obtenerProyectos()
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

}
