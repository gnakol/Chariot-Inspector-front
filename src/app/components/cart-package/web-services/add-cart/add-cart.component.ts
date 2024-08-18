import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../service/cart.service';
import { Router } from '@angular/router';
import { ManufacturerService } from '../../../manufacturer-package/service/manufacturer.service';
import { CartCategoryService } from '../../../cart-category-bean-package/service/cart-category.service';
import { FuelTypeService } from '../../../fuel-type-package/service/fuel-type.service';
import { Cart } from '../../bean/cart';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.scss']
})
export class AddCartComponent implements OnInit {

  cartForm!: FormGroup;
  manufacturers: string[] = [];  // Liste des fabricants
  categories: string[] = [];     // Liste des catégories
  fuelTypes: string[] = [];      // Liste des types d'alimentation

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router,
    private manufacturerService: ManufacturerService,
    private cartCategoryService: CartCategoryService,
    private fuelTypeService: FuelTypeService
  ) { }

  ngOnInit(): void {
    this.cartForm = this.fb.group({
      cartNumber: ['', [Validators.required, Validators.pattern('^[0-9a-zA-Z]*$')]],
      manufacturerName: ['', Validators.required],  // Nom au lieu de l'ID
      categoryName: ['', Validators.required],      // Nom au lieu de l'ID
      fuelTypeName: ['', Validators.required]       // Nom au lieu de l'ID
    });

    this.loadSelections();
  }

  loadSelections() {
    // Charger les listes pour les dropdowns
    this.manufacturerService.allManufacturer().subscribe(data => {
      this.manufacturers = data.content.map(item => item.name);  // Extraire les noms des fabricants
    });

    this.cartCategoryService.allCartCategories().subscribe(data => {
      this.categories = data.content.map(item => item.name);  // Extraire les noms des catégories
    });

    this.fuelTypeService.allFuelTypes().subscribe(data => {
      this.fuelTypes = data.content.map(item => item.name);  // Extraire les noms des types d'alimentation
    });
  }

  onSubmit(): void {
    if (this.cartForm.valid) {
      const cartNumber = this.cartForm.get('cartNumber')?.value;
      const manufacturerName = this.cartForm.get('manufacturerName')?.value;
      const categoryName = this.cartForm.get('categoryName')?.value;
      const fuelTypeName = this.cartForm.get('fuelTypeName')?.value;

      // Récupérer les IDs à partir des noms sélectionnés
      this.manufacturerService.getIdManufacturerByName(manufacturerName).subscribe(manufacturerId => {
        this.cartCategoryService.getIdCartCategoryByName(categoryName).subscribe(categoryId => {
          this.fuelTypeService.getIdFuelTypeByName(fuelTypeName).subscribe(fuelTypeId => {

            const newCart: Cart = {
              idCart: 0, // L'ID sera généré par le backend
              cartNumber: cartNumber,
              manufacturerId: manufacturerId,
              categoryId: categoryId,
              fuelTypeId: fuelTypeId
            };

            this.cartService.addNewCart(newCart).subscribe(
              (data) => {
                console.log('Chariot ajouté avec succès', data);
                this.router.navigate(['/dashboard/cart-template']);
              },
              (error) => {
                console.log('Erreur lors de l\'ajout du chariot', error);
              }
            );
          });
        });
      });
    }
  }
}
