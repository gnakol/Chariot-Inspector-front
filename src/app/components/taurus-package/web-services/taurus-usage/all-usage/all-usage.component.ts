import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TaurusService } from '../../../service/taurus.service';
import { UserService } from '../../../../user-package/service/user.service';
import { TaurusUsage } from '../../../bean/taurusUsage';
import { ConfirmationDialogComponent } from '../../../../other-package/composant/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-all-usage',
  templateUrl: './all-usage.component.html',
  styleUrls: ['./all-usage.component.scss']
})
export class AllUsageComponent implements OnInit {

  usages: any[] = [];
  filteredUsages: any[] = [];

  constructor(
    private taurusService: TaurusService,
    private userService: UserService,
    private router: Router,
    public matDialog : MatDialog
  ) { }

  ngOnInit(): void {
    this.loadUsages();
  }

  loadUsages(): void {
    this.taurusService.getAllUsages().subscribe(
      response => {
        const usages = response.content;
        usages.forEach(usage => {
          this.userService.getAccountById(usage.accountId).subscribe(
            account => {
              this.taurusService.getTaurusById(usage.taurusId).subscribe(
                taurus => {
                  const completeUsage = {
                    ...usage,
                    accountFirstName: account.firstName,
                    taurusNumber: taurus.taurusNumber
                  };
                  this.usages.push(completeUsage);
                  this.filteredUsages.push(completeUsage);
                },
                error => {
                  console.error('Erreur lors de la récupération du Taurus:', error);
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
        console.error('Erreur lors de la récupération des usages:', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    if (filterValue) {
      this.taurusService.searchTaurusUsages(filterValue, 0, 10).subscribe(
        response => {
          this.filteredUsages = response.content;
          console.log('Résultats filtrés:', this.filteredUsages);
        },
        error => {
          console.error('Erreur lors de la recherche des usages de Taurus:', error);
        }
      );
    } else {
      this.filteredUsages = [...this.usages]; // Reset filter
    }
  }
  
  


  viewDetails(idTaurusUsage: number): void {
    this.router.navigate(['/dashboard/detail-taurus-usage', idTaurusUsage]);
  }

  editUsage(idTaurusUsage: number): void {
    this.router.navigate(['/dashboard/update-taurus-usage', idTaurusUsage]);
  }

  removeUsage(usage: TaurusUsage) {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: `Êtes-vous sûr de vouloir supprimer cet usage de Taurus pour la session :  ${usage.workSessionId} ?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        console.log('voici l\'id de usage : ', usage.idTaurusUsage);
        this.taurusService.removeTaurusUsage(usage.idTaurusUsage!).subscribe(
          () => {
            console.log('Usage supprimé avec succès');
            this.usages = this.usages.filter(u => u.idTaurusUsage !== usage.idTaurusUsage);
            this.filteredUsages = this.filteredUsages.filter(u => u.idTaurusUsage !== usage.idTaurusUsage);
          },
          error => {
            console.error('Erreur lors de la suppression de l\'usage:', error);
          }
        );
      }
    });
  }
}
