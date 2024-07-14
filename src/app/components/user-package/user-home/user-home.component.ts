import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss'
})
export class UserHomeComponent {

  constructor(public dialog: MatDialog, private router : Router) { }

  openCreateUserDialog(): void {
    // Implémentez l'ouverture du dialogue de création d'utilisateur
    this.router.navigateByUrl('/add-info-user')
  }

  openUpdateUserDialog(): void {
    // Implémentez l'ouverture du dialogue de mise à jour d'utilisateur
  }

  openDeleteUserDialog(): void {
    // Implémentez l'ouverture du dialogue de suppression d'utilisateur
  }

  openSearchUserDialog(): void {
    // Implémentez l'ouverture du dialogue de recherche d'utilisateur
  }

  openViewUsersList(): void {
    // Implémentez l'ouverture de la liste des utilisateurs
  }

}
