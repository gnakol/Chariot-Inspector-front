import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-battery-template',
  templateUrl: './battery-template.component.html',
  styleUrl: './battery-template.component.scss'
})
export class BatteryTemplateComponent {

  constructor(public dialog: MatDialog, private router : Router) { }

  openCreateUserDialog(): void {
    // Implémentez l'ouverture du dialogue de création d'utilisateur
    this.router.navigateByUrl('/dashboard/add-battery')
  }

  openViewUsersList(): void {
    // Implémentez l'ouverture de la liste des utilisateurs
    this.router.navigateByUrl('/dashboard/all-battery');
  }

}
