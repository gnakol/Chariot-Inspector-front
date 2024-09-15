import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../service/issue.service';
import { UserService } from '../../../user-package/service/user.service';
import { ResumeService } from '../../../view-web-service/service/resume.service';
import { Account } from '../../../user-package/bean/account';
import { AuthService } from '../../../../authenticate/core/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Issue } from '../../bean/issue';

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
      const userIssueDescription = this.issueForm.value.description;
  
      const newIssue: Partial<Issue> = {
        description: userIssueDescription,
        accountId: this.issueForm.value.accountId,
        workSessionId: localStorage.getItem('workSessionId') ?? '',
        createdAt: new Date(this.issueForm.value.createdAt)
      };
  
      // Vérifier si un problème existant a été généré automatiquement pour cette session de travail
      this.issueService.getIssuesByWorkSessionId(newIssue.workSessionId!).subscribe(
        (existingIssues: Issue[]) => {
          if (existingIssues.length > 0) {
            // Fusionner les descriptions
            const existingIssue = existingIssues[0];
            newIssue.description = `${existingIssue.description} ${userIssueDescription}`;
  
            // Mettre à jour l'issue existante
            this.issueService.updateIssue(existingIssue.idIssue, newIssue as Issue).subscribe(
              () => {
                console.log('Issue mise à jour avec succès');
                this.router.navigate(['/dashboard/suivi']);
              },
              error => {
                console.error('Erreur lors de la mise à jour du problème', error);
              }
            );
          } else {
            // Créer une nouvelle issue si aucune n'existe
            this.issueService.addNewIssue(newIssue as Issue).subscribe(
              () => {
                console.log('Problème ajouté avec succès');
                this.router.navigate(['/dashboard/suivi']);
              },
              error => {
                console.error('Erreur lors de l\'ajout du problème', error);
              }
            );
          }
        },
        error => {
          console.error('Erreur lors de la vérification des problèmes existants', error);
        }
      );
    }
  }
  
  
  
}
