import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResumeService } from '../../../view-web-service/service/resume.service';
import { Router } from '@angular/router';
import { BatteryUsageService } from '../../service/battery-usage.service';
import { BatteryUsage } from '../../bean/battery-usage';
import { Pickup } from '../../../pickup-package/bean/pickup';
import { Battery } from '../../../battery-package/bean/battery';
import { BatteryService } from '../../../battery-package/service/battery.service';
import { IssueService } from '../../../issue-package/service/issue.service';
import { Issue } from '../../../issue-package/bean/issue';

@Component({
  selector: 'app-add-battery-usage',
  templateUrl: './add-battery-usage.component.html',
  styleUrls: ['./add-battery-usage.component.scss']
})
export class AddBatteryUsageComponent implements OnInit {
  batteryUsageForm!: FormGroup;
  batteries: Battery[] = [];
  pickupData: Pickup | null = null;

  constructor(
    private fb: FormBuilder,
    private batteryService: BatteryService,
    private batteryUsageService: BatteryUsageService,
    private resumeService: ResumeService,
    private router: Router,
    private issueService : IssueService
  ) { }

  ngOnInit(): void {
    this.batteryUsageForm = this.fb.group({
      batteryId: ['', Validators.required],
      changeTime: ['', Validators.required],
      chargeLevel: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      state: ['', Validators.required]
    });

    this.loadBatteries();
    this.pickupData = this.resumeService.getPickupData();

    console.log('Pickup data on init:', this.pickupData); // Debugging
    console.log('Batteries:', this.batteries); 
  }

  loadBatteries() {
    this.batteryService.allBattery().subscribe(data => {
      this.batteries = data.content;
    }, error => {
      console.error('Error fetching batteries: ', error);
    });
  }

  onSubmit(): void {
    console.log('Form submitted');
    console.log('Form valid:', this.batteryUsageForm.valid);
    console.log('Pickup data:', this.pickupData);
  
    if (this.batteryUsageForm.valid && this.pickupData) {
      const newBatteryUsage: BatteryUsage = {
        ...this.batteryUsageForm.value,
        cartId: this.pickupData.cartId,
        workSessionId: this.pickupData.workSessionId
      };
  
      console.log('New battery usage:', newBatteryUsage);
  
      this.batteryUsageService.addNewBatteryUsage(newBatteryUsage).subscribe(
        (data) => {
          console.log('Usage de batterie ajouté avec succès', data);

          // Si l'état est "MAUVAIS", on crée un problème
          if (newBatteryUsage.state === 'MAUVAIS') {
            this.createIssueForBatteryUsage(newBatteryUsage);
          }
          
          this.router.navigate(['/dashboard/suivi']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'usage de la batterie', error);
        }
      );
    } else {
      console.warn('Form is invalid or pickupData is null');
    }
  }

  createIssueForBatteryUsage(batteryUsage: BatteryUsage): void {
    const newDescription = `La batterie utilisée dans le chariot ${batteryUsage.cartId} est en mauvais état.`;
  
    this.issueService.getIssuesByWorkSessionId(batteryUsage.workSessionId!).subscribe(
      (existingIssues: Issue[]) => {
        if (existingIssues.length > 0) {
          // Fusionner les descriptions
          const existingIssue = existingIssues[0];
          const updatedDescription = `${existingIssue.description} ${newDescription}`;
          
          const updatedIssue: Partial<Issue> = {
            ...existingIssue,
            description: updatedDescription,
          };
  
          // Mettre à jour l'issue existante
          this.issueService.updateIssue(existingIssue.idIssue, updatedIssue as Issue).subscribe(
            () => {
              console.log('Issue mise à jour avec succès');
            },
            error => {
              console.error('Erreur lors de la mise à jour du problème', error);
            }
          );
        } else {
          // Créer une nouvelle issue si aucune n'existe
          const newIssue: Partial<Issue> = {
            description: newDescription,
            createdAt: new Date(),
            accountId: this.pickupData?.accountId,
            workSessionId: batteryUsage.workSessionId
          };
  
          this.issueService.addNewIssue(newIssue as Issue).subscribe(
            () => {
              console.log('Problème ajouté avec succès');
            },
            error => {
              console.error('Erreur lors de la création du problème:', error);
            }
          );
        }
      },
      error => {
        console.error('Erreur lors de la vérification des problèmes existants:', error);
      }
    );
  }
  
  
  
}
