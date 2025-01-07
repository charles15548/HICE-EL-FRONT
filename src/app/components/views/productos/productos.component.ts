import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  listaProductos: any[] = []
  formProducto: FormGroup
  title: any
  nameBoton: any
  id: number

  constructor(
    private _productoService: ProductosService,
    private _loginService : LoginService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.obtenerProductos()
    this.initForm()
  }

  initForm() {
    this.formProducto = new FormGroup({
      descripcion: new FormControl(null, [Validators.required]),
      cantidad: new FormControl(null, [Validators.required]),
      precio: new FormControl(null, [Validators.required]),
      enable: new FormControl('S'),
    })
  }

  obtenerProductos() {
    this._productoService.listarProductos()
      .subscribe((data) => {
        this.listaProductos = data.productos;
        console.log(data.productos)
        if (this.listaProductos.length == 0) {
          console.log("No hay datos")
        }
      });
  }

  obtenerProductoPorId(id: any) {
    let form = this.formProducto
    this._productoService.obtenerProducto(id)
      .subscribe((data) => {
        form.controls['descripcion'].setValue(data.productos.descripcion)
        form.controls['cantidad'].setValue(data.productos.cantidad)
        form.controls['precio'].setValue(data.productos.precio)
        form.controls['enable'].setValue(data.productos.enable)
        console.log(data.productos)
      });
  }

  eliminarProductos(id: any) {
    Swal.fire({
      title: '¿Estás seguro de eliminar el producto?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this._productoService.eliminarProductos(id)
          .subscribe((data) => {
            console.log("Producto eliminado", data)
            this.listaProductos = this.listaProductos.filter(item => item.id !== id);
          }, error => {
            console.error('Error al eliminar el producto', error);
          });

          this.alertaExitosa("eliminado")

      }
    });

  }


  registrarProducto(formulario: any): void {
    if (this.formProducto.valid) {
      this._productoService.generarProductos(formulario).subscribe(response => {
        this.cerrarModal()
        this.obtenerProductos()
        this.resetForm()
        console.log('Producto registrado', response);
      }, error => {
        console.error('Error al registrar producto', error);
      });
    }else{

    }
  }

  editarProducto(id: number, formulario: any): void {
    if (this.formProducto.valid) {
      this._productoService.editarProductos(id, formulario).subscribe(response => {
        this.cerrarModal()
        this.obtenerProductos()
        this.resetForm()
        console.log('Producto modificado', response);
      }, error => {
        console.error('Error al modificar producto', error);
      });
    }
  }

  titulo(titulo: any, id: number) {
    this.title = `${titulo} producto`
    titulo == "Crear" ? this.nameBoton = "Guardar" : this.nameBoton = "Modificar"
    if (id != null) {
      this.id = id
      this.obtenerProductoPorId(id)
    }
  }

  crearEditarProducto(boton: any) {
    if (boton == "Guardar") {
      this.formProducto.controls['enable'].setValue('S')
      this.alertRegistro()
    } else {
      this.alertModificar()
    }
  }

  cerrarModal() {
    const modalElement = document.getElementById('modalProducto');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  }
  resetForm(): void {
    this.formProducto.reset();
    this.formProducto.controls['enable'].setValue('S')
  }
  cerrarBoton() {
    this.resetForm()
    this.cerrarModal()
  }

  alertRegistro() {
    if (this.formProducto.valid) {
      Swal.fire({
        title: '¿Estás seguro de registrar el producto?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Sí, confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.registrarProducto(this.formProducto.value)
          this.alertaExitosa("registrado")
        }
      });
    }

  }

  alertModificar() {
    if (this.formProducto.valid) {
      Swal.fire({
        title: '¿Estás seguro de modificar el producto?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, modificar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.editarProducto(this.id, this.formProducto.value)
          this.alertaExitosa("modificado")
        }
      });
    }
  }

  alertaExitosa(titulo: any){
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Producto "+titulo,
      showConfirmButton: false,
      timer: 1500
    });
  }

  logout(){
    Swal.fire({
      title: '¿Estás seguro de cerrar sesion?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._loginService.logout()
        this.route.navigate(['login'])
      }
    });

  }

}
