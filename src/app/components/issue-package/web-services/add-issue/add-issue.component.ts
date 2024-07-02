import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../service/issue.service';
import { UserService } from '../../../user-package/service/user.service';
import { ResumeService } from '../../../view-web-service/service/resume.service';
import { Account } from '../../../user-package/bean/account';
import { AuthService } from '../../../../authenticate/core/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.scss']
})
export class AddIssueComponent implements OnInit {
  accountData: Account | null = null;
  user: any;
  issueForm!: FormGroup;

  constructor(
    private issueService: IssueService,
    private userService: UserService,
    private resumeService: ResumeService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.issueForm = this.fb.group({
      description: ['', Validators.required],
      createdAt: [new Date().toISOString().slice(0, 16), Validators.required], // Set current date and time
      accountId: ['']
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
              this.issueForm.patchValue({
                accountId: this.user.idAccount
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
    if (this.issueForm.valid) {
      const newIssue = this.issueForm.value;
      this.issueService.addNewIssue(newIssue).subscribe(
        (data) => {
          console.log('Problème ajouté avec succès', data);
          this.resumeService.setIssueData(data); // Ajoute le nouvel issue à la liste existante
          this.router.navigate(['/suivi']); // Rediriger vers la page de suivi
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du problème', error);
        }
      );
    }
  }
  
}
