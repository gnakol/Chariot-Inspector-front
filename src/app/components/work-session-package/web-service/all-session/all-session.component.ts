import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../user-package/service/user.service';
import { ConfirmationDialogComponent } from '../../../other-package/composant/confirmation-dialog/confirmation-dialog.component';
import { WorkSessionService } from '../../service/session.service';
import { WorkSession } from '../../bean/session';

@Component({
  selector: 'app-all-session',
  templateUrl: './all-session.component.html',
  styleUrls: ['./all-session.component.scss']
})
export class AllSessionComponent implements OnInit {

  sessions: any[] = [];
  filteredSessions: any[] = [];

  constructor(
    private workSessionService: WorkSessionService,
    private userService: UserService,
    private router: Router,
    public matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadSessions();
  }

  loadSessions(): void {
    this.workSessionService.getAllWorkSessions().subscribe(
      response => {
        const sessions = response.content;  // Récupère la liste de WorkSession à partir de la propriété 'content'
        sessions.forEach(session => {
          this.userService.getAccountById(session.accountId).subscribe(
            account => {
              const completeSession = {
                ...session,
                accountFirstName: account.firstName
              };
              this.sessions.push(completeSession);
              this.filteredSessions.push(completeSession);
            },
            error => {
              console.error('Erreur lors de la récupération du compte:', error);
            }
          );
        });
      },
      error => {
        console.error('Erreur lors de la récupération des sessions de travail:', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredSessions = this.sessions.filter(session =>
      session.accountFirstName.toLowerCase().includes(filterValue) ||
      session.workSessionId.toLowerCase().includes(filterValue)
    );
  }

  viewDetails(idWorkSession: number): void {
    this.router.navigate(['/dashboard/detail-work-session', idWorkSession]);
  }

  editWorkSession(idWorkSession: number): void {
    this.router.navigate(['/dashboard/update-work-session', idWorkSession]);
  }

  removeWorkSession(session: WorkSession) {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: `Êtes-vous sûr de vouloir supprimer la session de travail : ${session.workSessionId} ?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.workSessionService.removeWorkSession(session.idWorkSession).subscribe(
          () => {
            console.log('Session de travail supprimée avec succès');
            this.sessions = this.sessions.filter(s => s.idWorkSession !== session.idWorkSession);
            this.filteredSessions = this.filteredSessions.filter(s => s.idWorkSession !== session.idWorkSession);
          },
          error => {
            console.error('Erreur lors de la suppression de la session de travail:', error);
          }
        );
      }
    });
  }
}
