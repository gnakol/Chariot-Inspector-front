import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-taurus-template',
  templateUrl: './taurus-template.component.html',
  styleUrl: './taurus-template.component.scss'
})
export class TaurusTemplateComponent {

  constructor(public dialog: MatDialog, private router : Router) { }

  openCreateUserDialog(): void {
    // Implémentez l'ouverture du dialogue de création d'utilisateur
    this.router.navigateByUrl('/dashboard/add-cart')
  }

  openViewUsersList(): void {
    // Implémentez l'ouverture de la liste des utilisateurs
    this.router.navigateByUrl('/dashboard/all-cart');
  }

}
