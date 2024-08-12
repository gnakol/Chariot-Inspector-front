import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManufacturerService } from '../../service/manufacturer.service';
import { Router } from '@angular/router';
import { ManufacturerDTO } from '../../bean/manufacturer';

@Component({
  selector: 'app-add-manufacturer',
  templateUrl: './add-manufacturer.component.html',
  styleUrls: ['./add-manufacturer.component.scss']
})
export class AddManufacturerComponent implements OnInit {
  manufacturerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private manufacturerService: ManufacturerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.manufacturerForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.manufacturerForm.valid) {
      const newManufacturer: ManufacturerDTO = this.manufacturerForm.value;
      this.manufacturerService.addNewManufacturer(newManufacturer).subscribe(
        (data) => {
          console.log('Manufacturer added successfully', data);
          this.router.navigate(['/dashboard/manufacturer-template']);
        },
        (error) => {
          console.error('Error adding manufacturer', error);
        }
      );
    }
  }
}
