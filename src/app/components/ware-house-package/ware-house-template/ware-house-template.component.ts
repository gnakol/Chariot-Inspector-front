import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ware-house-template',
  templateUrl: './ware-house-template.component.html',
  styleUrl: './ware-house-template.component.scss'
})
export class WareHouseTemplateComponent {

  constructor(public dialog: MatDialog, private router : Router) { }

  openCreateUserDialog(): void {
    // Implémentez l'ouverture du dialogue de création d'utilisateur
    this.router.navigateByUrl('/dashboard/add-new-ware-house')
  }

  openViewUsersList(): void {
    // Implémentez l'ouverture de la liste des utilisateurs
    this.router.navigateByUrl('/dashboard/all-ware-house');
  }

}
