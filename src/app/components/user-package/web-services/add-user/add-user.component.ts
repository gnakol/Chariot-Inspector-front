import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { WareHouseService } from '../../../ware-house-package/service/ware-house.service';
import { ServiceBeanService } from '../../../service-bean-package/service-bean.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  accountForm!: FormGroup;

  wareHouses : any[] = [];

  services : any[] = [];

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
    private router: Router,
    private wareHouseService : WareHouseService,
    private serviceBeanService : ServiceBeanService
  ) { }

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      wareHouse: ['', Validators.required],
      accountServiceBeanId: ['', Validators.required],
      civility: ['', Validators.required],
      roleIds: [[], Validators.required]
    });

    this.loadWarehouses();
  }

  loadWarehouses() {
    this.wareHouseService.getAllWareHouse().subscribe(data => {
      this.wareHouses = data.content;
    });
  }

  onWarehouseChange(event: any) {
    const warehouseId = event.value;
    this.serviceBeanService.getServicesByWarehouseId(warehouseId).subscribe(data => {
      this.services = data.content;
    });
  }
  
  onRoleSelectionChange(event: any) {
    console.log('Selected Role IDs:', event.value);
  }

  onSubmit() {
    if (this.accountForm.valid) {
      const formValue = this.accountForm.value;

      console.log('contenue du service recuperer :', formValue.accountServiceBeanId);

      // Créer l'objet Account avec les rôles inclus
      const account = {
        name: formValue.name,
        firstName: formValue.firstName,
        email: formValue.email,
        password: formValue.password,
        accountServiceBeanId: formValue.accountServiceBeanId,
        civility: formValue.civility,
        roleDTOS: formValue.roleIds.map((idRole: number) => ({ idRole }))
      };

      // Afficher roleDTOS dans la console
      console.log('roleDTOS:', account.roleDTOS);

      this.userService.addAccount(account).subscribe(
        response => {
          console.log('User created successfully:', response);
          this.router.navigate(['/dashboard/user-home']);
        },
        error => {
          console.error('Error creating user:', error);
        }
      );
    }
  }
}
