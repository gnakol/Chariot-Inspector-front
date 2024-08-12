import { Component, OnInit } from '@angular/core';
import { CartCategoryDTO } from '../../bean/cart-category';
import { CartCategoryService } from '../../service/cart-category.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../other-package/composant/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-all-cart-category',
  templateUrl: './all-cart-category.component.html',
  styleUrl: './all-cart-category.component.scss'
})
export class AllCartCategoryComponent implements OnInit{

  cartCategories: CartCategoryDTO[] = [];
  filteredCartCategories: CartCategoryDTO[] = [];
  displayedColumns: string[] = ['counter', 'name', 'detail', 'delete'];

  constructor(
    private cartCategoryService: CartCategoryService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadCartCategories();
  }

  loadCartCategories(page: number = 0, size: number = 10) {
    this.cartCategoryService.allCartCategories().subscribe((data) => {
      this.cartCategories = data.content;
      this.filteredCartCategories = data.content;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredCartCategories = this.cartCategories.filter(category =>
      category.name.toLowerCase().includes(filterValue)
    );
  }

  viewDetail(category: CartCategoryDTO) {
    // Logic to view category details
  }

  deleteCartCategory(category: CartCategoryDTO) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: `Êtes-vous sûr de vouloir supprimer la catégorie ${category.name} ?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.cartCategoryService.deleteCartCategory(category.idCategory).subscribe(
          () => {
            console.log('Cart Category deleted successfully');
            this.loadCartCategories(); // Reload categories after deletion
          },
          error => {
            console.error('Error deleting cart category:', error);
          }
        );
      }
    });
  }

}
