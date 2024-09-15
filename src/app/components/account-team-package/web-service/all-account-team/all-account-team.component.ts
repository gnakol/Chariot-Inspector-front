import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AccountTeamService } from '../../service/account-team.service';
import { UserService } from '../../../user-package/service/user.service';
import { TeamService } from '../../../team-package/service/team.service';
import { ShiftService } from '../../../shift-package/service/shift.service';
import { AccountTeamDTO } from '../../bean/account-team';
import { ConfirmationDialogComponent } from '../../../other-package/composant/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-all-account-team',
  templateUrl: './all-account-team.component.html',
  styleUrls: ['./all-account-team.component.scss']
})
export class AllAccountTeamComponent implements OnInit {

  accountTeams: any[] = [];
  filteredAccountTeams: any[] = [];

  constructor(
    private accountTeamService: AccountTeamService,
    private userService: UserService,
    private teamService: TeamService,
    private shiftService: ShiftService,
    private router: Router,
    public matDialog : MatDialog
  ) { }

  ngOnInit(): void {
    this.loadAccountTeams();
  }

  loadAccountTeams(): void {
    this.accountTeamService.allAccountTeam().subscribe(
      response => {
        const accountTeams = response.content;  // Récupère la liste de AccountTeamDTO à partir de la propriété 'content'
        accountTeams.forEach(accountTeam => {
          this.userService.getAccountById(accountTeam.accountId).subscribe(
            account => {
              this.teamService.getTeamById(accountTeam.teamId).subscribe(
                team => {
                  this.shiftService.getShiftById(accountTeam.shiftId).subscribe(
                    shift => {
                      const completeAccountTeam = {
                        ...accountTeam,
                        accountFirstName: account.firstName,
                        teamName: team.name,
                        shiftName: shift.name
                      };
                      this.accountTeams.push(completeAccountTeam);
                      this.filteredAccountTeams.push(completeAccountTeam);
                    },
                    error => {
                      console.error('Erreur lors de la récupération du shift:', error);
                    }
                  );
                },
                error => {
                  console.error('Erreur lors de la récupération de la team:', error);
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
        console.error('Erreur lors de la récupération des AccountTeams:', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredAccountTeams = this.accountTeams.filter(accountTeam => 
      accountTeam.accountFirstName.toLowerCase().includes(filterValue) ||
      accountTeam.teamName.toLowerCase().includes(filterValue) ||
      accountTeam.shiftName.toLowerCase().includes(filterValue) ||
      accountTeam.workSessionId.slice(-4).toLowerCase().includes(filterValue)
    );
  }

  viewDetails(idAccountTeam: number): void {
    this.router.navigate(['/dashboard/detail-account-team', idAccountTeam]);
  }

  editAccountTeam(idAccountTeam: number): void {
    this.router.navigate(['/dashboard/update-account-team', idAccountTeam]);
  }

  removeAccountTeam(accountTeam: AccountTeamDTO) {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: `Êtes-vous sûr de vouloir supprimer l'équipe de compte pour la session : ${accountTeam.workSessionId} ?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.accountTeamService.removeAccountTeam(accountTeam.idAccountTeam!).subscribe(
          () => {
            console.log('Account team supprimé avec succès');
            this.accountTeams = this.accountTeams.filter(at => at.idAccountTeam !== accountTeam.idAccountTeam);
            this.filteredAccountTeams = this.filteredAccountTeams.filter(at => at.idAccountTeam !== accountTeam.idAccountTeam);
          },
          error => {
            console.error('Erreur lors de la suppression de l\'Account team:', error);
          }
        );
      }
    });
  }
}
