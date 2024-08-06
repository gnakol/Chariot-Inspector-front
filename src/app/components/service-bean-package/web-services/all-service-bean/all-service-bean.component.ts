import { Component, OnInit } from '@angular/core';
import { AccountServiceDTO } from '../../bean/sevice-bean';
import { ServiceBeanService } from '../../service-bean.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../other-package/composant/confirmation-dialog/confirmation-dialog.component';
import { WareHouseService } from '../../../ware-house-package/service/ware-house.service';
import { forkJoin, map } from 'rxjs';

interface ServiceWithWareHouseName extends AccountServiceDTO{
  wareHouseName : string;
}

@Component({
  selector: 'app-all-service-bean',
  templateUrl: './all-service-bean.component.html',
  styleUrl: './all-service-bean.component.scss'
})

export class AllServiceBeanComponent implements OnInit{

  servicesBeans: ServiceWithWareHouseName[] = [];
  displayedColumns: string[] = ['counter', 'name', 'wareHouseId', 'detail', 'delete'];
  filteredServices: ServiceWithWareHouseName[] = [];

  constructor(
    private accountServiceBean: ServiceBeanService,
    public dialog: MatDialog,
    private wareHouseService : WareHouseService
  ) {}

  ngOnInit() {
    this.loadServices();
  }

  loadServices(page: number = 0, size: number = 10) {
    this.accountServiceBean.allAccountServiceBean(page, size).subscribe((data) => {
      const services = data.content;

      // Parcourir tous les services pour obtenir les noms des entrepôts
      const warehouseRequests = services.map(service => {
        return this.wareHouseService.getWareHouseById(service.wareHouseId).pipe(
          map(warehouse => ({
            ...service,
            wareHouseName: warehouse.name
          }))
        );
      });

      // Exécute toutes les requêtes pour obtenir les noms des entrepôts
      forkJoin(warehouseRequests).subscribe((servicesWithNames) => {
        this.servicesBeans = servicesWithNames;
        this.filteredServices = servicesWithNames;
      });
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredServices = this.servicesBeans.filter(service =>
      service.name.toLowerCase().includes(filterValue)
    );
  }

  viewDetail(service: AccountServiceDTO) {
    // Logic to view service details
  }

  deleteService(service: AccountServiceDTO) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: `Êtes-vous sûr de vouloir supprimer le service ${service.name} ?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.accountServiceBean.deleteServiceBean(service.idAccountService).subscribe(
          () => {
            console.log('Service supprimé avec succès');
            this.loadServices(); // Recharger la liste des services après suppression
          },
          error => {
            console.error('Erreur lors de la suppression du service :', error);
          }
        );
      }
    });
  }

}
