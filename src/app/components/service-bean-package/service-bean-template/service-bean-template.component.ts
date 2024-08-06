import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-bean-template',
  templateUrl: './service-bean-template.component.html',
  styleUrl: './service-bean-template.component.scss'
})
export class ServiceBeanTemplateComponent {

  constructor(public dialog: MatDialog, private router : Router) { }

  openCreateServiceDialog(): void {
    // Implémentez l'ouverture du dialogue de création d'utilisateur
    this.router.navigateByUrl('/dashboard/add-new-service-bean')
  }

  openViewServiceList(): void {
    // Implémentez l'ouverture de la liste des utilisateurs
    this.router.navigateByUrl('/dashboard/all-service-bean');
  }


}
