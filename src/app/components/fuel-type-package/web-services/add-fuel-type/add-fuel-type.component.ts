import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuelTypeService } from '../../service/fuel-type.service';
import { Router } from '@angular/router';
import { FuelTypeDTO } from '../../bean/fuel-type';

@Component({
  selector: 'app-add-fuel-type',
  templateUrl: './add-fuel-type.component.html',
  styleUrls: ['./add-fuel-type.component.scss']
})
export class AddFuelTypeComponent implements OnInit {
  fuelTypeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fuelTypeService: FuelTypeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fuelTypeForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.fuelTypeForm.valid) {
      const newFuelType: FuelTypeDTO = this.fuelTypeForm.value;
      this.fuelTypeService.addNewFuelType(newFuelType).subscribe(
        (data) => {
          console.log('Fuel Type added successfully', data);
          this.router.navigate(['/dashboard/fuel-types']);
        },
        (error) => {
          console.error('Error adding fuel type', error);
        }
      );
    }
  }
}
