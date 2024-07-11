import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BatteryService } from '../../service/battery.service';
import { Battery } from '../../bean/battery';
import { ResumeService } from '../../../view-web-service/service/resume.service';
import { Router } from '@angular/router';
import { CartService } from '../../../cart-package/service/cart.service';
import { Cart } from '../../../cart-package/bean/cart';

@Component({
  selector: 'app-add-battery',
  templateUrl: './add-battery.component.html',
  styleUrls: ['./add-battery.component.scss']
})
export class AddBatteryComponent implements OnInit {

  batteryForm!: FormGroup;
  cartAvailable: boolean = false;
  cartNumber: number | null = null;
  cartData : Cart | null = null;

  constructor(private fb: FormBuilder, 
    private batteryService: BatteryService, 
    private resumeService: ResumeService, 
    private router: Router,
    private cartService : CartService) 
    {}

  ngOnInit(): void {

    this.batteryForm = this.fb.group({
      batteryNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      chargeLevel: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      state: ['', Validators.required],
      idCart: ['']
    });

    this.loadCardData();

    
  }

  loadCardData() : void
  {
    this.cartData = this.resumeService.getCartData();

    if(this.cartData)
      {
        this.batteryForm.patchValue({idCart : this.cartData.idCart});
      }
  }

  onSubmit(): void {

    if (this.batteryForm.valid) {
      const newBattery: Battery = this.batteryForm.value;
      this.batteryService.addNewBattery(newBattery).subscribe(
        (data) => {
          console.log('Batterie ajoutée avec succès', data);
          this.resumeService.setBatteryData(data);
          this.router.navigate(['/dashboard/suivi']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la batterie', error);
        }
      );
    }
  }
}
