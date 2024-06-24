import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../../../../user-package/bean/account';
import { AuthService } from '../../../../../authenticate/core/auth.service';
import { ResumeService } from '../../../../view-web-service/service/resume.service';
import { TaurusService } from '../../../service/taurus.service';
import { TaurusUsage } from '../../../bean/taurusUsage';
import { UserService } from '../../../../user-package/service/user.service';
import { Taurus } from '../../../bean/taurus';

@Component({
  selector: 'app-add-usage',
  templateUrl: './add-usage.component.html',
  styleUrls: ['./add-usage.component.scss']
})
export class AddUsageComponent implements OnInit {

  usageForm!: FormGroup;
  user: Account | undefined;
  taurus: Taurus | undefined;
  taurusNumbers = [101, 102, 103, 104, 105, 106];

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router, 
    private resumeService: ResumeService,
    private taurusService: TaurusService, 
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.usageForm = this.fb.group({
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      service: ['', Validators.required],
      usageDate: [new Date().toISOString().split('T')[0], Validators.required],
      taurusNumber: [null, Validators.required]
    });

    this.loadUserData();
  }

  loadUserData() {
    const token = this.authService.getToken();
    if (token) {
      const payload = this.authService.parseJwt(token);
      const email = payload.sub;

      this.userService.getUserIdByEmail(email).subscribe(
        (userIdResponse: any) => {
          const userId = userIdResponse;
          this.userService.getAccountById(userId).subscribe(
            (data: Account) => {
              this.user = data;
              this.usageForm.patchValue({
                name: this.user.name,
                firstName: this.user.firstName,
                service: this.user.service
              });
            },
            (error: any) => {
              console.error('Error loading user data:', error);
            }
          );
        },
        (error: any) => {
          console.error('Error fetching user ID by email:', error);
        }
      );
    }
  }

  onSubmit() {
    if (this.usageForm.valid) {
      const taurusNumber = this.usageForm.value.taurusNumber;
      console.log('Selected Taurus Number:', taurusNumber); // Log le numéro de Taurus sélectionné

      this.taurusService.getIdTaurusByNum(taurusNumber).subscribe(
        (taurusId: number) => {
          console.log('Fetched Taurus ID:', taurusId); // Log l'ID de Taurus récupéré

          this.taurusService.getTaurusById(taurusId).subscribe(
            (taurusData: Taurus) => {
              this.taurus = taurusData;
              console.log('Fetched Taurus Data:', this.taurus); // Log les données du Taurus récupérées

              const taurusUsage: TaurusUsage = {
                accountId: this.user!.idAccount,
                taurusId: this.taurus!.idTaurus,
                usageDate: this.usageForm.value.usageDate
              };

              console.log('Taurus Usage Data to be sent:', taurusUsage); // Log les données de TaurusUsage

              this.taurusService.addNewTaurusUsage(taurusUsage).subscribe(
                (data: TaurusUsage) => {
                  console.log('Taurus usage added successfully', data);
                  this.resumeService.setTaurusUsageData(data);
                  this.router.navigate(['/suivi']);
                },
                (error: any) => {
                  console.error('Error saving taurus usage:', error);
                }
              );
            },
            (error: any) => {
              console.error('Error fetching taurus data:', error);
            }
          );
        },
        (error: any) => {
          console.error('Error fetching taurus ID:', error);
        }
      );
    }
  }
}
