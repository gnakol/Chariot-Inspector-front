import { Component, OnInit } from '@angular/core';
import { Cart } from '../../bean/cart';
import { MatTableDataSource } from '@angular/material/table';
import { CartService } from '../../service/cart.service';
import { Router } from '@angular/router';
import { ManufacturerService } from '../../../manufacturer-package/service/manufacturer.service';
import { CartCategoryService } from '../../../cart-category-bean-package/service/cart-category.service';
import { FuelTypeService } from '../../../fuel-type-package/service/fuel-type.service';
import { forkJoin } from 'rxjs';
import { ManufacturerDTO } from '../../../manufacturer-package/bean/manufacturer';
import { CartCategoryDTO } from '../../../cart-category-bean-package/bean/cart-category';
import { FuelTypeDTO } from '../../../fuel-type-package/bean/fuel-type';

@Component({
  selector: 'app-all-cart',
  templateUrl: './all-cart.component.html',
  styleUrls: ['./all-cart.component.scss']
})
export class AllCartComponent implements OnInit {
  dataSource = new MatTableDataSource<Cart>();
  filteredData: Cart[] = [];
  pagedData: Cart[] = [];
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;

  manufacturerMap: { [key: number]: string } = {};
  categoryMap: { [key: number]: string } = {};
  fuelTypeMap: { [key: number]: string } = {};

  constructor(
    private cartService: CartService, 
    private router: Router,
    private manufacturerService: ManufacturerService,
    private cartCategoryService: CartCategoryService,
    private fuelTypeService: FuelTypeService
  ) {}

  ngOnInit(): void {
    // Chargez les données de base pour le mapping
    this.loadMappings().then(() => {
      this.cartService.allCart().subscribe(data => {
        console.log(data);
        this.dataSource.data = data.content;
        this.filteredData = data.content;
        this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
        this.updatePagedData();
      }, error => {
        console.log('Error fetching cart: ', error);
      });
    });
  }

  loadMappings(): Promise<void> {
    return new Promise((resolve, reject) => {
      forkJoin([
        this.manufacturerService.allManufacturer(),
        this.cartCategoryService.allCartCategories(),
        this.fuelTypeService.allFuelTypes()
      ]).subscribe(
        ([manufacturers, categories, fuelTypes]) => {
          this.manufacturerMap = manufacturers.content.reduce<{ [key: number]: string }>((map, item: ManufacturerDTO) => {
            map[item.idManufacturer] = item.name;
            return map;
          }, {});

          this.categoryMap = categories.content.reduce<{ [key: number]: string }>((map, item: CartCategoryDTO) => {
            map[item.idCategory] = item.name;
            return map;
          }, {});

          this.fuelTypeMap = fuelTypes.content.reduce<{ [key: number]: string }>((map, item: FuelTypeDTO) => {
            map[item.idFuelType] = item.name;
            return map;
          }, {});

          resolve();
        },
        error => {
          console.error('Error loading mappings:', error);
          reject(error);
        }
      );
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredData = this.dataSource.data.filter(cart => cart.cartNumber.toString().toLowerCase().includes(filterValue));
    this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
    this.currentPage = 0;
    this.updatePagedData();
  }

  updatePagedData(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.pagedData = this.filteredData.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updatePagedData();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePagedData();
    }
  }

  viewDetails(cart: Cart): void {
    console.log('Voir les détails du chariot:', cart);
  }

  getManufacturerName(id: number): string {
    return this.manufacturerMap[id] || 'N/A';
  }

  getCategoryName(id: number): string {
    return this.categoryMap[id] || 'N/A';
  }

  getFuelTypeName(id: number): string {
    return this.fuelTypeMap[id] || 'N/A';
  }

  home() {
    this.router.navigateByUrl("/home");
  }

  deleteCart(cart: Cart): void {
    if (confirm(`Voulez-vous vraiment supprimer le chariot ${cart.cartNumber} ?`)) {
      this.cartService.removeCart(cart.idCart).subscribe(
        () => {
          console.log('Chariot supprimé avec succès');
          this.ngOnInit(); // Recharger la liste après suppression
        },
        error => {
          console.error('Erreur lors de la suppression du chariot:', error);
        }
      );
    }
  }
  
  editCart(cart: Cart): void {
    this.router.navigate(['/edit-cart', cart.idCart]);
  }
  
}
