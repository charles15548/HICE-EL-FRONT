import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductosComponent } from './components/views/productos/productos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/auth/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthInterceptor } from './components/helpers/auth.interceptor';
import { AuthGuard } from './components/helpers/auth.guard';
import { AudiosComponent } from './components/views/audios/audios.component';
import { PersonajesComponent } from './components/views/personajes/personajes.component';
import { ProyectosComponent } from './components/views/proyectos/proyectos.component';
import { MainheaderComponent } from './components/structs/mainheader/mainheader.component';
import { MainfooterComponent } from './components/structs/mainfooter/mainfooter.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProyectoComponent } from './components/views/crear/proyecto/proyecto.component';
import { ExplorarProyectosComponent } from './components/views/explorar/explorar-proyectos/explorar-proyectos.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    LoginComponent,
    AudiosComponent,
    PersonajesComponent,
    ProyectosComponent,
    MainheaderComponent,
    MainfooterComponent,
    RegisterComponent,
    ProyectoComponent,
    ExplorarProyectosComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      /**/ 
      {path: 'login', component: LoginComponent},
      {path: '', component: LoginComponent},
      /* vista del creador*/ 
      {path: 'proyecto/:idUsuario/crear', component: ProyectoComponent, canActivate:[AuthGuard]},
      {path: 'proyecto/:idUsuario/personaje/:idProyecto/crear', component: PersonajesComponent, canActivate:[AuthGuard]},
      {path: 'proyecto/:idUsuario/personaje/:idProyecto/audio/:idPersonaje/crear', component: AudiosComponent, canActivate:[AuthGuard]},

      /* vista del oyente*/ 
      {path: 'proyectos', component: ExplorarProyectosComponent, canActivate:[AuthGuard]},
      {path: 'proyectos/personajes/:idProyecto', component: PersonajesComponent, canActivate:[AuthGuard]},
      {path: 'proyectos/:idProyecto/personajes/:idPersonaje/audios', component: AudiosComponent, canActivate:[AuthGuard]},

      /* usuario */
      {path: 'usuario/registro', component: RegisterComponent},

    ]),
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
