import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manufacturer-template',
  templateUrl: './manufacturer-template.component.html',
  styleUrl: './manufacturer-template.component.scss'
})
export class ManufacturerTemplateComponent {

  constructor(public dialog: MatDialog, private router : Router) { }

  openCreateManufacturerDialog(): void {
    // Implémentez l'ouverture du dialogue de création d'utilisateur
    this.router.navigateByUrl('/dashboard/add-new-manufacturer')
  }

  openViewManufacturerList(): void {
    // Implémentez l'ouverture de la liste des utilisateurs
    this.router.navigateByUrl('/dashboard/all-manufacturer');
  }

}
