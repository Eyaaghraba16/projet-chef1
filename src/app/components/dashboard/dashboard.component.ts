import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  userName: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;

    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.userName = `${this.currentUser.prenom} ${this.currentUser.nom}`;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateTo(page: string) {
    const role = this.currentUser?.role;
    this.router.navigate([`/${role}/${page}`]);
  }
}
