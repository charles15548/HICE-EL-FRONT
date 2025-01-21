import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mainheader',
  templateUrl: './mainheader.component.html',
  styleUrls: ['./mainheader.component.css']
})
export class MainheaderComponent implements OnInit {

  Usuario: any=null;

  constructor(
    private _loginService : LoginService,
    private _usuariosService: UsuariosService,
    private route: Router,
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {
   
    //const idUsuario = this._loginService.ObtenerIdUsuarioLogueado();
    //this.obtenerUsuarioPorId(idUsuario);
    this.obtenerUsuarioPorLogueado();
  }

  obtenerUsuarioPorId(id: any){
    this._usuariosService.listarUsuarioPorId(id)
    .subscribe((data)=>{
      this.Usuario = data.Usuario;
      console.log(data.Usuario)
    },(error)=>{
      console.error('Error al obtener Usuario por id',error);
    });
  }
  obtenerUsuarioPorLogueado(){
    this._usuariosService.listarUsuarioLogueado()
    .subscribe((data)=>{
      this.Usuario = data.Usuario;
      console.log(data.Usuario)
    },(error)=>{
      console.error('Error al obtener Usuario',error);
    });
  }

  verMisProyectos(idUsuario:number){
    this.route.navigate(['usuario',idUsuario,'proyecto','crear'])
  }

  logout(){
    Swal.fire({
      position: "center",
      icon: 'question',
      title: "Espera...",
      text: '¿Estás seguro de cerrar sesión?',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#f44336',
    }).then((result) => {
      if (result.isConfirmed) {
        this._loginService.logout()
        this.route.navigate(['login'])
      }
    });
  }

}
