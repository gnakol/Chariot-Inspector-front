import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fuel-type-template',
  templateUrl: './fuel-type-template.component.html',
  styleUrl: './fuel-type-template.component.scss'
})
export class FuelTypeTemplateComponent {

  constructor(public dialog: MatDialog, private router : Router) { }

  openCreateFuelTypeDialog(): void {
    // Implémentez l'ouverture du dialogue de création d'utilisateur
    this.router.navigateByUrl('/dashboard/add-new-fuel-type')
  }

  openViewFuelTypeList(): void {
    // Implémentez l'ouverture de la liste des utilisateurs
    this.router.navigateByUrl('/dashboard/all-fuel-type');
  }

}
