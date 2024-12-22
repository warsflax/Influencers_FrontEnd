import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environements/environement';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  // Méthode pour s'inscrire
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/register`, user);
  }

  // Méthode pour se connecter
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/login`, credentials);
  }
  
  // Méthode pour s'inscrire
  inflencers(inflencers: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/inflencers`, inflencers);
  }
}
