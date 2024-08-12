import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-category-template',
  templateUrl: './cart-category-template.component.html',
  styleUrl: './cart-category-template.component.scss'
})
export class CartCategoryTemplateComponent {

  constructor(public dialog: MatDialog, private router : Router) { }

  openCreateCategoryDialog(): void {
    // Implémentez l'ouverture du dialogue de création d'utilisateur
    this.router.navigateByUrl('/dashboard/add-new-cart-category')
  }

  openViewCategoryList(): void {
    // Implémentez l'ouverture de la liste des utilisateurs
    this.router.navigateByUrl('/dashboard/all-cart-category');
  }

}
