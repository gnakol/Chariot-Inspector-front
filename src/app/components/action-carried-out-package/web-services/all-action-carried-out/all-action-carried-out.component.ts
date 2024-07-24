import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionCarriedOutDTO } from '../../bean/action-carried-out';
import { ActionCarriedOutService } from '../../service/action-carried-out.service';
import { ConfirmationDialogComponent } from '../../../other-package/composant/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-all-action-carried-out',
  templateUrl: './all-action-carried-out.component.html',
  styleUrls: ['./all-action-carried-out.component.scss']
})
export class AllActionCarriedOutComponent implements OnInit {
  actions: ActionCarriedOutDTO[] = [];
  displayedColumns: string[] = ['counter', 'description', 'issueId', 'accountId', 'detail', 'edit', 'delete'];

  constructor(
    private actionCarriedOutService: ActionCarriedOutService,
    private router: Router,
    public dialog : MatDialog
  ) {}

  ngOnInit() {
    this.loadActions();
  }

  loadActions(page: number = 0, size: number = 10) {
    this.actionCarriedOutService.getAllActionsCarriedOut(page, size).subscribe((data) => {
      this.actions = data.content;
    });
  }

  viewDetail(action: ActionCarriedOutDTO) {
    // Logic to view action details
  }

  editAction(action: ActionCarriedOutDTO) {
    this.router.navigate(['/dashboard/edit-action-carried-out', action.idActionCarriedOut]);
  }

  deleteAction(action: ActionCarriedOutDTO) {
    // this.actionCarriedOutService.deleteActionCarriedOut(action.idActionCarriedOut).subscribe(() => {
    //   this.loadActions();
    // });

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: `Êtes-vous sûr de vouloir supprimer l'utilisateur ${action.description} ?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.actionCarriedOutService.deleteActionCarriedOut(action.idActionCarriedOut).subscribe(
          () => {
            console.log('Action carried out  deleted successfully');
            this.loadActions(); // Recharger la liste des utilisateurs après suppression
          },
          error => {
            console.error('Error deleting action carried out:', error);
          }
        );
      }
    });
  }
}
