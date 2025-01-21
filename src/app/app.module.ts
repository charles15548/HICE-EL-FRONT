import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/auth/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthInterceptor } from './components/helpers/auth.interceptor';
import { AuthGuard } from './components/helpers/auth.guard';
import { MainheaderComponent } from './components/structs/mainheader/mainheader.component';
import { MainfooterComponent } from './components/structs/mainfooter/mainfooter.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProyectoComponent } from './components/views/crear/proyecto/proyecto.component';
import { ExplorarProyectosComponent } from './components/views/explorar/explorar-proyectos/explorar-proyectos.component';
import { ExplorarPersonajesComponent } from './components/views/explorar/explorar-personajes/explorar-personajes.component';
import { ExplorarAudiosComponent } from './components/views/explorar/explorar-audios/explorar-audios.component';
import { PersonajeComponent } from './components/views/crear/personaje/personaje.component';
import { AudioComponent } from './components/views/crear/audio/audio.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainheaderComponent,
    MainfooterComponent,
    RegisterComponent,
    ProyectoComponent,
    ExplorarProyectosComponent,
    ExplorarPersonajesComponent,
    ExplorarAudiosComponent,
    PersonajeComponent,
    AudioComponent,
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
      {path: 'usuario/:idUsuario/proyecto/crear', component: ProyectoComponent, canActivate:[AuthGuard]},
      {path: 'proyecto/:idProyecto/personaje/crear', component: PersonajeComponent, canActivate:[AuthGuard]},
      {path: 'proyecto/:idProyecto/personaje/:idPersonaje/audio/crear', component: AudioComponent, canActivate:[AuthGuard]},

      /* vista del oyente*/ 
      {path: 'proyectos', component: ExplorarProyectosComponent, canActivate:[AuthGuard]},
      {path: 'proyectos/personajes/:idProyecto', component: ExplorarPersonajesComponent, canActivate:[AuthGuard]},
      {path: 'proyectos/:idProyecto/personajes/:idPersonaje/audios', component: ExplorarAudiosComponent, canActivate:[AuthGuard]},

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
