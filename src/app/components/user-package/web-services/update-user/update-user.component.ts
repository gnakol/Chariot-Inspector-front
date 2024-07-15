import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  accountForm!: FormGroup;
  userId!: number;
  roles = [
    { idRole: 1, roleName: 'RECEPTIONNAIRE' },
    { idRole: 2, roleName: 'CHEF_EQUIPE' },
    { idRole: 3, roleName: 'AUDITEUR' },
    { idRole: 4, roleName: 'ADMIN' },
    { idRole: 5, roleName: 'INJECTEUR' },
    { idRole: 6, roleName: 'AGENT_MAITRISE' }
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.accountForm = this.fb.group({
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      service: ['', Validators.required],
      civility: ['', Validators.required],
      roleDTOS: [[], Validators.required]
    });

    this.loadUserData();
  }

  loadUserData() {
    this.userService.getAccountById(this.userId).subscribe(
      user => {
        if (user) {
          this.accountForm.patchValue({
            name: user.name,
            firstName: user.firstName,
            email: user.email,
            service: user.service,
            civility: user.civility,
            roleDTOS: user.roles ? user.roles.map((role: any) => role.idRole) : []
          });
        }
      },
      error => {
        console.error('Error loading user data:', error);
      }
    );
  }

  onSubmit() {
    if (this.accountForm.valid) {
      const formValue = this.accountForm.value;
      const updatedAccount = {
        ...formValue,
        roleDTOS: formValue.roleDTOS.map((idRole: number) => ({ idRole }))
      };

      this.userService.updateAccount(this.userId, updatedAccount).subscribe(
        response => {
          console.log('User updated successfully:', response);
          this.router.navigate(['/dashboard/all-users']);
        },
        error => {
          console.error('Error updating user:', error);
        }
      );
    }
  }
}
