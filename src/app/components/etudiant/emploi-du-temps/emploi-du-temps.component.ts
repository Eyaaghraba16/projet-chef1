import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-emploi-du-temps',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emploi-du-temps.component.html',
  styleUrls: ['./emploi-du-temps.component.css']
})
export class EmploiDuTempsComponent implements OnInit {
  emploiDuTemps: any[] = [];
  loading = true;
  errorMessage = '';

  jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  horaires = [
    '08h30 - 10h00',
    '10h10 - 11h40',
    '11h50 - 13h20',
    '14h30 - 16h00',
    '16h10 - 17h40'
  ];

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.chargerEmploiDuTemps();
  }

  chargerEmploiDuTemps() {
    const etudiantId = this.authService.currentUserValue?.id;
    this.apiService.getEmploiDuTemps(etudiantId).subscribe({
      next: (data: any[]) => {
        this.emploiDuTemps = data.map(c => ({
          ...c,
          jour: this.getJour(c.date),
          horaire: `${c.heure_debut} - ${c.heure_fin}`
        }));
        this.loading = false;
      },
      error: () => {
        this.errorMessage = "Erreur lors du chargement de l'emploi du temps.";
        this.loading = false;
      }
    });
  }

  getJour(dateStr: string): string {
    const date = new Date(dateStr);
    const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return jours[date.getDay()];
  }

  getCours(jour: string, horaire: string) {
    // Retourne tous les cours correspondant à ce créneau
    return this.emploiDuTemps.filter(c => c.jour === jour && c.horaire === horaire);
  }

  retour() {
    this.router.navigate(['/dashboard']);
  }
}
