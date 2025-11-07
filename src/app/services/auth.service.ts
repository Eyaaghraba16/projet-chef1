import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    const userJson = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      userJson ? JSON.parse(userJson) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(loginOrEmail: string, mot_de_passe: string): Observable<User> {
    loginOrEmail = loginOrEmail.trim().toLowerCase();
    return this.http.post<any>(`${this.apiUrl}/login`, { loginOrEmail, mot_de_passe })
      .pipe(map(response => {
        if (response && response.token && response.user) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user as User);
        }
        return response.user as User;
      }));
  }

  register(email: string, mot_de_passe: string, nom: string, prenom: string, role: string): Observable<any> {
    const login = email.split('@')[0].trim().toLowerCase();
    return this.http.post(`${this.apiUrl}/register`, { login, email, mot_de_passe, nom, prenom, role });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
