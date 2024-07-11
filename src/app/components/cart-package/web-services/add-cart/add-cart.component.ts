import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../service/cart.service';
import { Cart } from '../../bean/cart';
import { ResumeService } from '../../../view-web-service/service/resume.service';
import { Router } from '@angular/router';
import { PickupService } from '../../../pickup-package/service/pickup.service';
import { Pickup } from '../../../pickup-package/bean/pickup';
import { UserService } from '../../../user-package/service/user.service';
import { AuthService } from '../../../../authenticate/core/auth.service';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrl: './add-cart.component.scss'
})
export class AddCartComponent implements OnInit {

  cartForm!: FormGroup;
  user: any;  // Variable pour stocker les informations de l'utilisateur connecté

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private resumeService: ResumeService,
    private router: Router,
    private pickupService: PickupService,
    private userService: UserService,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
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
      pickupDateTime: ['', Validators.required],
      returnDateTime: ['', Validators.required]
    });

    this.loadUserData();
  }

  loadUserData() {
    const token = this.authService.getToken();
    if (token) {
      const payload = this.authService.parseJwt(token);
      const email = payload.sub;
      this.userService.getUserIdByEmail(email).subscribe(
        userIdResponse => {
          const userId = userIdResponse;
          this.userService.getAccountById(userId).subscribe(
            data => {
              this.user = data;
            },
            error => {
              console.error('Error loading user data', error);
            }
          );
        },
        error => {
          console.error('Error fetching user ID by email: ', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.cartForm.valid) {
      const newCart: Cart = this.cartForm.value;
      this.cartService.addNewCart(newCart).subscribe(
        (data) => {
          console.log('Chariot ajouté avec succès', data);
          this.resumeService.setCartData(data);

          const newPickup: Pickup = {
            idPickup: 0,
            accountId: this.user.idAccount,
            cartId: data.idCart,
            pickupDateTime: this.cartForm.value.pickupDateTime,
            returnDateTime: this.cartForm.value.returnDateTime,
            workSessionId : localStorage.getItem('workSessionId') || ''
          };

          this.pickupService.addNewPickup(newPickup).subscribe(
            (pickupData) => {
              console.log('Pickup ajouté avec succès', pickupData);
              this.resumeService.setPickupData(pickupData);
              this.router.navigate(['/dashboard/suivi']);
            },
            (error) => {
              console.error('Erreur lors de l\'ajout du pickup', error);
            }
          );

        },
        (error) => {
          console.log('Erreur lors de l\'ajout du chariot', error);
        }
      );
    }
  }
}
