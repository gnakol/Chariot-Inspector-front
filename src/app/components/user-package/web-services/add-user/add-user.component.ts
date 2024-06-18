import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../../../authenticate/core/auth.service';
import { Router } from '@angular/router';
import { ResumeService } from '../../../view-web-service/service/resume.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  accountForm!: FormGroup;

  user: any;

  constructor(private fb: FormBuilder, 
    private userService: UserService, 
    private authService: AuthService, 
    private router : Router,
    private resumeService : ResumeService) { }

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      service: ['', Validators.required],
      pickUpDateTime: ['', Validators.required],
      taurusNumber: ['', Validators.required],
      function: ['', Validators.required]
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
              this.accountForm.patchValue({
                name: this.user.name,
                firstName: this.user.firstName,
                service: this.user.service
              });
            },
            error => {
              console.error('Error loading user data:', error);
            }
          );
        },
        error => {
          console.error('Error fetching user ID by email:', error);
        }
      );
    }
  }

  onSubmit() {
    if (this.accountForm.valid) {
      // Soumettre les données
      // Par exemple, sauvegarder dans la base de données
      console.log('Form Data:', this.accountForm.value);

      this.resumeService.setAccountData(this.accountForm.value);
      // Naviguer vers la page de résumé
      this.router.navigate(['/suivi']);
    }
  }
}
