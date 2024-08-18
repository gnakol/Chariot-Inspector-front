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
import { IssueService } from '../../../issue-package/service/issue.service';
import { Issue } from '../../../issue-package/bean/issue';

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
    private userService: UserService,
    private issueService : IssueService
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

  loadRelevantFields() {
    const selectedCartId = this.pickupForm.get('cartId')?.value;
    const selectedCart = this.carts.find(cart => cart.idCart === selectedCartId);
  
    if (selectedCart) {
      this.pickupService.getRelevantFields(selectedCart.idCart).subscribe(
        relevantFieldsMap => {
          const relevantFields: string[] = [];
  
          // Parcourir les entrées de l'objet
          Object.entries(relevantFieldsMap).forEach(([key, value]) => {
            if (value) {
              relevantFields.push(key);
            }
          });
  
          // Masquer ou afficher les champs en fonction des relevantFields
          this.updateFormFieldsVisibility(relevantFields);
        },
        error => {
          console.error('Error loading relevant fields:', error);
        }
      );
    }
  }
  
  
  

  updateFormFieldsVisibility(relevantFields: string[]) {
    // Liste complète des champs du formulaire
    const fields = [
      'conditionChassis',            // État du châssis / carter
      'wheelsTornPlat',              // Roues non déchirées et absence de plat
      'batteryCablesSockets',        // Câbles et prises batterie
      'conditionForks',              // État des fourches
      'cleanNonSlipPlatform',        // Plateforme propre et anti-dérapante
      'windshield',                  // Pare-brise (pour chariot frontal)
      'gasBlockStrap',               // Bloc gaz + sangle (pour chariot frontal)
      'forwardReverseControl',       // Commandes de marche avant/arrière
      'honk',                        // Klaxon
      'functionalElevationSystem',   // Système d'élévation fonctionnel
      'emergencyStop',               // Arrêt d'urgence
      'noLeak',                      // Absence de fuite
      'antiCrushButton'              // Bouton anti-écrasement
    ];
  
    fields.forEach(field => {
      if (relevantFields.includes(field)) {
        this.pickupForm.get(field)?.enable();
      } else {
        this.pickupForm.get(field)?.disable();
      }
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

  createIssuesIfNeeded(pickup: Pickup) {
    const fieldsToCheck: Array<{ field: keyof Pickup, label: string }> = [
      { field: 'conditionChassis', label: 'État du châssis / carter' },
      { field: 'wheelsTornPlat', label: 'Roues non déchirées et absence de plat' },
      { field: 'batteryCablesSockets', label: 'Câbles et prises batterie' },
      { field: 'conditionForks', label: 'État des fourches' },
      { field: 'cleanNonSlipPlatform', label: 'Plateforme propre et anti-dérapante' },
      { field: 'windshield', label: 'Pare-brise' },
      { field: 'gasBlockStrap', label: 'Bloc gaz + sangle' },
      { field: 'forwardReverseControl', label: 'Commandes de marche avant/arrière' },
      { field: 'honk', label: 'Klaxon' },
      { field: 'functionalElevationSystem', label: 'Système d\'élévation fonctionnel' },
      { field: 'emergencyStop', label: 'Arrêt d\'urgence' },
      { field: 'noLeak', label: 'Absence de fuite' },
      { field: 'antiCrushButton', label: 'Bouton anti-écrasement' }
    ];
  
    fieldsToCheck.forEach(({ field, label }) => {
      if (pickup[field] === 'MAUVAIS') {
        const newIssue: Partial<Issue> = {
          description: `${label} est en mauvais état`,
          accountId: pickup.accountId,
          workSessionId: localStorage.getItem('workSessionId') || ''
        };
  
        this.issueService.addNewIssue(newIssue as Issue).subscribe(
          issueData => {
            console.log('Problème ajouté:', issueData);
          },
          error => {
            console.error('Erreur lors de l\'ajout du problème:', error);
          }
        );
      }
    });
  }
  
  
}
