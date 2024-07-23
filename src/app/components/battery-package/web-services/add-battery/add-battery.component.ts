import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BatteryService } from '../../service/battery.service';
import { Battery } from '../../bean/battery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-battery',
  templateUrl: './add-battery.component.html',
  styleUrls: ['./add-battery.component.scss']
})
export class AddBatteryComponent implements OnInit {
  batteryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private batteryService: BatteryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.batteryForm = this.fb.group({
      batteryNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      refBattery: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.batteryForm.valid) {
      const newBattery: Battery = this.batteryForm.value;
      this.batteryService.addNewBattery(newBattery).subscribe(
        (data) => {
          console.log('Batterie ajoutée avec succès', data);
          this.router.navigate(['/dashboard/battery-template']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la batterie', error);
        }
      );
    }
  }
}
