import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PickupService } from '../../service/pickup.service';
import { UserService } from '../../../user-package/service/user.service';
import { CartService } from '../../../cart-package/service/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../other-package/composant/confirmation-dialog/confirmation-dialog.component';
import { Pickup } from '../../bean/pickup';

@Component({
  selector: 'app-all-pickup',
  templateUrl: './all-pickup.component.html',
  styleUrls: ['./all-pickup.component.scss']
})
export class AllPickupComponent implements OnInit {

  pickups: any[] = [];
  filteredPickups: any[] = [];

  constructor(
    private pickupService: PickupService,
    private userService: UserService,
    private cartService: CartService,
    private router: Router,
    public matDialog : MatDialog
  ) { }

  ngOnInit(): void {
    this.loadPickups();
  }

  loadPickups(): void {
    this.pickupService.allPickups().subscribe(
      response => {
        const pickups = response.content;
        pickups.forEach(pickup => {
          this.userService.getAccountById(pickup.accountId).subscribe(
            account => {
              this.cartService.getCartById(pickup.cartId).subscribe(
                cart => {
                  const completePickup = {
                    ...pickup,
                    accountFirstName: account.firstName,
                    cartNumber: cart.cartNumber
                  };
                  this.pickups.push(completePickup);
                  this.filteredPickups.push(completePickup);
                },
                error => {
                  console.error('Erreur lors de la récupération du chariot:', error);
                }
              );
            },
            error => {
              console.error('Erreur lors de la récupération du compte:', error);
            }
          );
        });
      },
      error => {
        console.error('Erreur lors de la récupération des pickups:', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredPickups = this.pickups.filter(pickup => 
      pickup.accountFirstName.toLowerCase().includes(filterValue) ||
      pickup.cartNumber.toLowerCase().includes(filterValue) ||
      pickup.workSessionId.slice(-4).toLowerCase().includes(filterValue)
    );
  }

  viewDetails(idPickup: number): void {
    this.router.navigate(['/dashboard/detail-pickup', idPickup]);
  }

  editPickup(idPickup: number): void {
    this.router.navigate(['/pickup/update', idPickup]);
  }

  removePickup(pickup: Pickup) {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: `Êtes-vous sûr de vouloir supprimer la saisine Chariot de cette session :  ${pickup.workSessionId} ?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.pickupService.removePickup(pickup.idPickup).subscribe(
          () => {
            console.log('Pickup deleted successfully');
            this.pickups = this.pickups.filter(p => p.idPickup !== pickup.idPickup);
            this.filteredPickups = this.filteredPickups.filter(p => p.idPickup !== pickup.idPickup);
          },
          error => {
            console.error('Error deleting pickup:', error);
          }
        );
      }
    });
  }
}
