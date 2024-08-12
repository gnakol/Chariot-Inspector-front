import { Component, OnInit } from '@angular/core';
import { ManufacturerDTO } from '../../bean/manufacturer';
import { ManufacturerService } from '../../service/manufacturer.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../other-package/composant/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-all-manufacturer',
  templateUrl: './all-manufacturer.component.html',
  styleUrls: ['./all-manufacturer.component.scss']
})
export class AllManufacturerComponent implements OnInit {

  manufacturers: ManufacturerDTO[] = [];
  filteredManufacturers: ManufacturerDTO[] = [];
  displayedColumns: string[] = ['counter', 'name', 'detail', 'delete'];

  constructor(
    private manufacturerService: ManufacturerService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadManufacturers();
  }

  loadManufacturers(page: number = 0, size: number = 10) {
    this.manufacturerService.allManufacturer().subscribe((data) => {
      this.manufacturers = data.content;
      this.filteredManufacturers = data.content;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredManufacturers = this.manufacturers.filter(manufacturer =>
      manufacturer.name.toLowerCase().includes(filterValue)
    );
  }

  viewDetail(manufacturer: ManufacturerDTO) {
    // Logic to view manufacturer details
  }

  // deleteManufacturer(manufacturer: ManufacturerDTO) {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '350px',
  //     data: { message: `Êtes-vous sûr de vouloir supprimer le fabricant ${manufacturer.name} ?` }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === 'confirm') {
  //       // Assuming a method deleteManufacturer exists
  //       this.manufacturerService.deleteManufacturer(manufacturer.idManufacturer).subscribe(
  //         () => {
  //           console.log('Manufacturer deleted successfully');
  //           this.loadManufacturers(); // Reload manufacturers after deletion
  //         },
  //         error => {
  //           console.error('Error deleting manufacturer:', error);
  //         }
  //       );
  //     }
  //   });
  // }
}
