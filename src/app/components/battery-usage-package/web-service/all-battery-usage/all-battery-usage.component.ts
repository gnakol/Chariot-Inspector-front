import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BatteryUsageService } from '../../service/battery-usage.service';
import { CartService } from '../../../cart-package/service/cart.service';
import { BatteryService } from '../../../battery-package/service/battery.service';
import { BatteryUsage } from '../../bean/battery-usage';
import { ConfirmationDialogComponent } from '../../../other-package/composant/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-all-battery-usage',
  templateUrl: './all-battery-usage.component.html',
  styleUrls: ['./all-battery-usage.component.scss']
})
export class AllBatteryUsageComponent implements OnInit {

  batteryUsages: any[] = [];
  filteredBatteryUsages: any[] = [];

  constructor(
    private batteryUsageService: BatteryUsageService,
    private cartService: CartService,
    private batteryService: BatteryService,
    private router: Router,
    public matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadBatteryUsages();
  }

  loadBatteryUsages(): void {
    this.batteryUsageService.getAllBatteryUsage().subscribe(
      response => {
        const batteryUsages = response.content;
        batteryUsages.forEach(batteryUsage => {
          this.cartService.getCartById(batteryUsage.cartId).subscribe(
            cart => {
              this.batteryService.getBatteryById(batteryUsage.batteryId).subscribe(
                battery => {
                  const completeUsage = {
                    ...batteryUsage,
                    cartNumber: cart.cartNumber,
                    batteryNumber: battery.batteryNumber
                  };
                  this.batteryUsages.push(completeUsage);
                  this.filteredBatteryUsages.push(completeUsage);
                },
                error => {
                  console.error('Erreur lors de la récupération de la batterie:', error);
                }
              );
            },
            error => {
              console.error('Erreur lors de la récupération du chariot:', error);
            }
          );
        });
      },
      error => {
        console.error('Erreur lors de la récupération des usages de batterie:', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredBatteryUsages = this.batteryUsages.filter(usage => 
      usage.cartNumber.toLowerCase().includes(filterValue) ||
      usage.batteryNumber.toString().includes(filterValue) ||
      usage.workSessionId.slice(-4).toLowerCase().includes(filterValue)
    );
  }

  viewDetails(idBatteryUsage: number): void {
    this.router.navigate(['/dashboard/detail-battery-usage', idBatteryUsage]);
  }

  editUsage(idBatteryUsage: number): void {
    this.router.navigate(['/dashboard/update-battery-usage', idBatteryUsage]);
  }

  removeUsage(usage: BatteryUsage) {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: `Êtes-vous sûr de vouloir supprimer cet usage de batterie pour la session :  ${usage.workSessionId} ?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.batteryUsageService.removeBatteryUsage(usage.idBatteryUsage!).subscribe(
          () => {
            console.log('Usage supprimé avec succès');
            this.batteryUsages = this.batteryUsages.filter(u => u.idBatteryUsage !== usage.idBatteryUsage);
            this.filteredBatteryUsages = this.filteredBatteryUsages.filter(u => u.idBatteryUsage !== usage.idBatteryUsage);
          },
          error => {
            console.error('Erreur lors de la suppression de l\'usage:', error);
          }
        );
      }
    });
  }
}
