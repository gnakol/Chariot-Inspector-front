import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../../cart-package/service/cart.service';
import { Router } from '@angular/router';
import { PickupService } from '../../service/pickup.service';
import { ResumeService } from '../../../view-web-service/service/resume.service';
import { AuthService } from '../../../../authenticate/core/auth.service';
import { UserService } from '../../../user-package/service/user.service';
import { Cart } from '../../../cart-package/bean/cart';
import { Pickup } from '../../bean/pickup';

@Component({
  selector: 'app-add-pickup',
  templateUrl: './add-pickup.component.html',
  styleUrls: ['./add-pickup.component.scss']
})
export class AddPickupComponent implements OnInit {
  pickupForm!: FormGroup;
  account: any;
  carts: Cart[] = [];

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router,
    private pickupService: PickupService,
    private resumeService: ResumeService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.pickupForm = this.fb.group({
      cartId: ['', Validators.required],
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
    this.loadCarts();
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
              this.account = data;
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

  loadCarts() {
    this.cartService.allCart().subscribe(data => {
      this.carts = data.content;
    }, error => {
      console.error('Error fetching carts: ', error);
    });
  }

  onSubmit(): void {
    if (this.pickupForm.valid) {
      const newPickup: Pickup = {
        ...this.pickupForm.value,
        accountId: this.account.idAccount
      };

      this.pickupService.addNewPickup(newPickup).subscribe(
        (data) => {
          console.log('Pickup ajouté avec succès', data);
          this.resumeService.setPickupData(data);
          this.router.navigate(['/dashboard/suivi']);
        },
        (error) => {
          console.log('Erreur lors de l\'ajout du pickup', error);
        }
      );
    }
  }
}
