import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BatteryService } from '../../service/battery.service';
import { Battery } from '../../bean/battery';
import { ResumeService } from '../../../view-web-service/service/resume.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-battery',
  templateUrl: './add-battery.component.html',
  styleUrls: ['./add-battery.component.scss']
})
export class AddBatteryComponent implements OnInit {

  batteryForm!: FormGroup;
  cartAvailable: boolean = false;
  cartNumber: number | null = null;

  constructor(private fb: FormBuilder, private batteryService: BatteryService, private resumeService: ResumeService, private router: Router) {
    this.batteryForm = this.fb.group({
      batteryNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      chargeLevel: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      state: ['', Validators.required],
      cartNumber: [''] // Ajoutez ce contrôle de formulaire
    });
  }

  ngOnInit(): void {
    const cartData = this.resumeService.getCartData();
    if (cartData) {
      this.cartAvailable = true;
      this.cartNumber = cartData.cartNumber;
      this.batteryForm.patchValue({ cartNumber: this.cartNumber });
    }
  }

  onSubmit(): void {
    if (this.batteryForm.valid) {
      const newBattery: Battery = {
        ...this.batteryForm.value,
        cart: this.cartAvailable && this.cartNumber !== null ? { idCart: this.cartNumber } : null
      };

      console.log('Battery to be sent:', newBattery); // Ajoutez ceci pour vérifier les données

      this.batteryService.addNewBattery(newBattery).subscribe(
        (data) => {
          console.log('Batterie ajoutée avec succès', data);
          this.resumeService.setBatteryData(data);
          this.router.navigate(['/suivi']);
        },
        (error) => {
          console.log('Erreur lors de l\'ajout de la batterie', error);
        }
      );
    }
  }
}
