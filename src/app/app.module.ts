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


@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    LoginComponent,
    AudiosComponent,
    PersonajesComponent,
    ProyectosComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'productos', component: ProductosComponent, canActivate: [AuthGuard]},
      {path: 'audios', component: AudiosComponent, canActivate: [AuthGuard]},
      {path: 'audios/:idPersonaje', component: AudiosComponent, canActivate: [AuthGuard]},
      {path: 'personajes/:idProyecto', component: PersonajesComponent, canActivate: [AuthGuard]},
      {path: 'proyectos', component: ProyectosComponent, canActivate:[AuthGuard]},
      {path: 'login', component: LoginComponent},
      {path: '', component: LoginComponent},
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
