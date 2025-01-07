import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = environment.url;

  private login: string = `${this.baseUrl}/login`

  constructor(
    private http: HttpClient
  ) { }

  ingresar(request : any): Observable<any> {
    return this.http.post(`${this.login}`, request, {
      observe: 'response'
    }).pipe(map((response : HttpResponse<any>) => {
      const body = response.body;
      const headers = response.headers;

      const beaberToken = headers.get('Authorization');
      const token = beaberToken.replace('Bearer ', '');
      localStorage.setItem('token', token);
      return body;
    }))
  }

 token(){
    return localStorage.getItem('token');
 }

 logout() {
  localStorage.removeItem('token');
}

}
