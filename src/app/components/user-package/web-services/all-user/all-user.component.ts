import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AccountResponse } from '../../bean/page';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../other-package/composant/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.scss']
})
export class AllUserComponent implements OnInit {
  displayedColumns: string[] = ['name', 'firstName', 'email', 'service', 'roles', 'civility', 'edit', 'delete', 'view'];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private userService: UserService, 
    public dialog: MatDialog, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((response: AccountResponse) => {
      console.log('AccountResponse:', response.content);
      this.dataSource.data = response.content;
    }, error => {
      console.error('Error loading users:', error);
    });
  }

  getRoleNames(roles: any[]): string {
    return roles ? roles.map(role => role.roleName).join(', ') : '';
  }

  editUser(user: any) {
    this.router.navigate(['/dashboard/update-user', user.idAccount]);
  }

  deleteUser(user: any) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: `Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.name} ${user.firstName} ?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.userService.deleteAccount(user.idAccount).subscribe(
          () => {
            console.log('User deleted successfully');
            this.loadUsers(); // Recharger la liste des utilisateurs après suppression
          },
          error => {
            console.error('Error deleting user:', error);
          }
        );
      }
    });
  }

  viewUserDetails(user: any) {
    console.log('View user details:', user);
  }
}
