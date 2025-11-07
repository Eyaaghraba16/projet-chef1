import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // Créer les headers avec le token d'authentification
  private getHeaders(): HttpHeaders {
    const user = this.authService.currentUserValue;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': user?.token ? `Bearer ${user.token}` : ''
    });
  }

  // -------------------- EMPLOI DU TEMPS --------------------
  // Récupérer l'emploi du temps pour l'étudiant connecté
  getEmploiDuTemps(etudiantId?: number): Observable<any> {
    // Si pas d'ID fourni, récupérer l'ID de l'utilisateur connecté
    const id = etudiantId || this.authService.currentUserValue?.id;
    return this.http.get(`${this.apiUrl}/emploi-du-temps/student/${id}`, { headers: this.getHeaders() });
  }

  // Ajouter une séance (optionnel, pour admin)
  addSeance(seance: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/emploi-du-temps`, seance, { headers: this.getHeaders() });
  }

  // Modifier une séance
  updateSeance(id: number, seance: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/emploi-du-temps/${id}`, seance, { headers: this.getHeaders() });
  }

  // Supprimer une séance
  deleteSeance(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/emploi-du-temps/${id}`, { headers: this.getHeaders() });
  }

  // -------------------- AUTRES SERVICES --------------------
  getAbsences(): Observable<any> {
    return this.http.get(`${this.apiUrl}/absences`, { headers: this.getHeaders() });
  }

  signalerAbsence(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/absences`, data, { headers: this.getHeaders() });
  }

  getNotes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/notes`, { headers: this.getHeaders() });
  }

  getNotifications(): Observable<any> {
    return this.http.get(`${this.apiUrl}/notifications`, { headers: this.getHeaders() });
  }

  getRattrapages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/rattrapages`, { headers: this.getHeaders() });
  }

  proposerRattrapage(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/rattrapages`, data, { headers: this.getHeaders() });
  }

  getMessages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/messages`, { headers: this.getHeaders() });
  }

  envoyerMessage(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/messages`, data, { headers: this.getHeaders() });
  }

  getDepartements(): Observable<any> {
    return this.http.get(`${this.apiUrl}/departements`, { headers: this.getHeaders() });
  }

  getMatieres(): Observable<any> {
    return this.http.get(`${this.apiUrl}/matieres`, { headers: this.getHeaders() });
  }

  getSalles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/salles`, { headers: this.getHeaders() });
  }
}
