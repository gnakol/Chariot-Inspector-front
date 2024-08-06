import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WareHouseDTO } from '../../../ware-house-package/bean/ware-house';
import { ServiceBeanService } from '../../service-bean.service';
import { WareHouseService } from '../../../ware-house-package/service/ware-house.service';
import { Router } from '@angular/router';
import { AccountServiceDTO } from '../../bean/sevice-bean';

@Component({
  selector: 'app-add-service-bean',
  templateUrl: './add-service-bean.component.html',
  styleUrl: './add-service-bean.component.scss'
})
export class AddServiceBeanComponent implements OnInit {

  serviceForm!: FormGroup;
  warehouses: WareHouseDTO[] = [];

  constructor(
    private fb: FormBuilder,
    private serviceBeanService: ServiceBeanService,
    private warehouseService: WareHouseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      wareHouseId: ['', Validators.required]
    });

    this.loadWarehouses();
  }

  loadWarehouses(): void {
    this.warehouseService.getAllWareHouse().subscribe((data) => {
      this.warehouses = data.content;
    });
  }

  onSubmit(): void {
    if (this.serviceForm.valid) {
      const newService: AccountServiceDTO = this.serviceForm.value;
      this.serviceBeanService.addNewAccountServiceBean(newService).subscribe(
        (data) => {
          console.log('Service ajouté avec succès', data);
          this.router.navigate(['/dashboard/service-bean-template']);
        },
        (error) => {
          console.error("Erreur lors de l'ajout du service", error);
        }
      );
    }
  }

}
