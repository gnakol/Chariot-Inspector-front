import { Component, OnInit } from '@angular/core';
import { FuelTypeDTO } from '../../bean/fuel-type';
import { FuelTypeService } from '../../service/fuel-type.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../other-package/composant/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-all-fuel-type',
  templateUrl: './all-fuel-type.component.html',
  styleUrl: './all-fuel-type.component.scss'
})
export class AllFuelTypeComponent implements OnInit {

  fuelTypes: FuelTypeDTO[] = [];
  filteredFuelTypes: FuelTypeDTO[] = [];
  displayedColumns: string[] = ['counter', 'name', 'detail', 'delete'];

  constructor(
    private fuelTypeService: FuelTypeService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadFuelTypes();
  }

  loadFuelTypes(page: number = 0, size: number = 10) {
    this.fuelTypeService.allFuelTypes().subscribe((data) => {
      this.fuelTypes = data.content;
      this.filteredFuelTypes = data.content;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredFuelTypes = this.fuelTypes.filter(type =>
      type.name.toLowerCase().includes(filterValue)
    );
  }

  viewDetail(fuelType: FuelTypeDTO) {
    // Logic to view fuel type details
  }

  deleteFuelType(fuelType: FuelTypeDTO) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: `Êtes-vous sûr de vouloir supprimer le type de carburant ${fuelType.name} ?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.fuelTypeService.deleteFuelType(fuelType.idFuelType).subscribe(
          () => {
            console.log('Fuel Type deleted successfully');
            this.loadFuelTypes(); // Reload fuel types after deletion
          },
          error => {
            console.error('Error deleting fuel type:', error);
          }
        );
      }
    });
  }

}
