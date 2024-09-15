import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Issue } from '../../bean/issue';
import { IssueService } from '../../service/issue.service';
import { UserService } from '../../../user-package/service/user.service';

@Component({
  selector: 'app-detail-issue',
  templateUrl: './detail-issue.component.html',
  styleUrls: ['./detail-issue.component.scss']
})
export class DetailIssueComponent implements OnInit {

  issue?: Issue;
  accountName?: string;

  constructor(
    private issueService: IssueService,
    private route: ActivatedRoute,
    private accountService : UserService
  ) {}

  ngOnInit(): void {
    const idIssue = this.route.snapshot.paramMap.get('idIssue');
    if (idIssue) {
      this.issueService.getIssueById(Number(idIssue)).subscribe(
        issue => {
          this.issue = issue;
          // Récupération des informations de l'utilisateur
          this.accountService.getAccountById(issue.accountId).subscribe(
            account => {
              this.accountName = `${account.firstName} ${account.lastName}`;
            },
            error => {
              console.error('Erreur lors de la récupération des informations utilisateur:', error);
            }
          );
        },
        error => {
          console.error('Erreur lors de la récupération du problème:', error);
        }
      );
    }
  }
}
