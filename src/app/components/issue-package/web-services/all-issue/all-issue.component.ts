import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../user-package/service/user.service';
import { IssueService } from '../../service/issue.service';
import { Issue } from '../../bean/issue';
import { ConfirmationDialogComponent } from '../../../other-package/composant/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-all-issue',
  templateUrl: './all-issue.component.html',
  styleUrls: ['./all-issue.component.scss']
})
export class AllIssueComponent implements OnInit {

  issues: any[] = [];
  filteredIssues: any[] = [];

  constructor(
    private issueService: IssueService,
    private userService: UserService,
    private router: Router,
    public matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadIssues();
  }

  loadIssues(): void {
    this.issueService.getAllIssue().subscribe(
      response => {
        const issues = response.content;
        issues.forEach(issue => {
          this.userService.getAccountById(issue.accountId).subscribe(
            account => {
              const completeIssue = {
                ...issue,
                accountFirstName: account.firstName,
                accountLastName: account.lastName
              };
              this.issues.push(completeIssue);
              this.filteredIssues.push(completeIssue);
            },
            error => {
              console.error('Erreur lors de la récupération du compte:', error);
            }
          );
        });
      },
      error => {
        console.error('Erreur lors de la récupération des issues:', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredIssues = this.issues.filter(issue => 
      issue.accountFirstName.toLowerCase().includes(filterValue) ||
      issue.accountLastName.toLowerCase().includes(filterValue) ||
      issue.workSessionId.slice(-4).toLowerCase().includes(filterValue)
    );
  }

  viewDescription(issue: Issue): void {
    this.router.navigate(['/dashboard/detail-issue', issue.idIssue]);
  }

  editIssue(idIssue: number): void {
    this.router.navigate(['/dashboard/update-issue', idIssue]);
  }

  removeIssue(issue: Issue) {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: `Êtes-vous sûr de vouloir supprimer ce problème ?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.issueService.removeIssue(issue.idIssue).subscribe(
          () => {
            console.log('Issue supprimée avec succès');
            this.issues = this.issues.filter(i => i.idIssue !== issue.idIssue);
            this.filteredIssues = this.filteredIssues.filter(i => i.idIssue !== issue.idIssue);
          },
          error => {
            console.error('Erreur lors de la suppression du problème:', error);
          }
        );
      }
    });
  }
}
