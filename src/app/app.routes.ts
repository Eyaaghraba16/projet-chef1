import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmploiDuTempsComponent } from './components/etudiant/emploi-du-temps/emploi-du-temps.component';

// Routes de l'application
export const routes: Routes = [
  // Route par défaut - redirection vers login
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Authentification
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Dashboard principal
  { path: 'dashboard', component: DashboardComponent },

  // Routes pour ÉTUDIANT
  { path: 'etudiant/emploi-du-temps', component: EmploiDuTempsComponent },

  // Routes pour ENSEIGNANT
  { path: 'enseignant/emploi-du-temps', component: EmploiDuTempsComponent },

  // Routes pour DIRECTEUR
  { path: 'directeur/emploi-du-temps', component: EmploiDuTempsComponent },

  // Routes pour ADMINISTRATIF
  { path: 'administratif/emploi-du-temps', component: EmploiDuTempsComponent },

  // Route 404 - redirection vers login
  { path: '**', redirectTo: '/login' }
];
