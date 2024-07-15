import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AccountResponse } from '../../bean/page';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.scss']
})
export class AllUserComponent implements OnInit {
  displayedColumns: string[] = ['name', 'firstName', 'email', 'service', 'roles', 'civility', 'edit', 'delete', 'view'];
  dataSource = new MatTableDataSource<any>();

  constructor(private userService: UserService, public dialog: MatDialog) {}

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
    // Open a dialog or navigate to the edit page
    console.log('Edit user:', user);
  }

  deleteUser(user: any) {
    // Implement delete functionality
    console.log('Delete user:', user);
  }

  viewUserDetails(user: any) {
    // Open a dialog or navigate to the details page
    console.log('View user details:', user);
  }
}
