import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../service/cart.service';
import { Cart } from '../../bean/cart';
import { ResumeService } from '../../../view-web-service/service/resume.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrl: './add-cart.component.scss'
})
export class AddCartComponent implements OnInit{

  cartForm! : FormGroup;

  constructor(private fb: FormBuilder, private cartService: CartService, private resumeService : ResumeService, private router : Router) {
    this.cartForm = this.fb.group({
      cartNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      conditionChassis: ['', Validators.required],
      wheelsTornPlat: ['', Validators.required],
      batteryCablesSockets: ['', Validators.required],
      conditionForks: ['', Validators.required],
      cleanNonSlipPlatform: ['', Validators.required],
      windshield: ['', Validators.required],
      gasBlockStrap: ['', Validators.required],
      forwardReverseControl: ['', Validators.required],
      honk: ['', Validators.required],
      functionalElevationSystem: ['', Validators.required],
      emergencyStop: ['', Validators.required],
      noLeak: ['', Validators.required],
      antiCrushButton: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.cartForm.valid) {
      const newCart: Cart = this.cartForm.value;
      this.cartService.addNewCart(newCart).subscribe(
        (data) => {
          console.log('Chariot ajouté avec succès', data);
          this.resumeService.setCartData(data);

          // Logique de redirection ou de notification

          this.router.navigate(['/suivi']);
        },
        (error) => {
          console.log('Erreur lors de l\'ajout du chariot', error);
        }
      );
    }
  }

}
