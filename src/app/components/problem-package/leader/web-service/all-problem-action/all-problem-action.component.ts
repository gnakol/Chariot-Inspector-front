import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Issue } from '../../../../issue-package/bean/issue';
import { IssueService } from '../../../../issue-package/service/issue.service';
import { CartService } from '../../../../cart-package/service/cart.service';
import { TaurusService } from '../../../../taurus-package/service/taurus.service';
import { UserService } from '../../../../user-package/service/user.service';
import { forkJoin, map, switchMap } from 'rxjs';
import { PickupService } from '../../../../pickup-package/service/pickup.service';
import { ResumeService } from '../../../../view-web-service/service/resume.service';

@Component({
  selector: 'app-all-problem-action',
  templateUrl: './all-problem-action.component.html',
  styleUrls: ['./all-problem-action.component.scss']
})
export class AllProblemActionComponent implements OnInit {
  issues: any[] = [];  // Change the type to any[]
  displayedColumns: string[] = ['counter', 'firstName', 'cartNumber', 'taurusNumber', 'issue', 'usageDate', 'detail', 'action'];

  constructor(
    private route: ActivatedRoute,
    private issueService: IssueService,
    private cartService: CartService,
    private taurusService: TaurusService,
    private userService: UserService,
    private pickupService: PickupService,
    private resumeService: ResumeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const teamId = params['teamId'];
      const startDate = params['startDate'];
      const endDate = params['endDate'];
      const page = params['page'];
      const size = params['size'];

      this.issueService.getAllIssuesWithoutAction(teamId, startDate, endDate, page, size).subscribe((data: any) => {
        const issues = data.content;

        // Filtrer les issues qui ont un workSessionId défini
        const validIssues = issues.filter((issue: Issue) => issue.workSessionId);

        const issueDetailsObservables = validIssues.map((issue: Issue) => {
          return this.userService.getAccountById(issue.accountId).pipe(
            switchMap(account => {
              console.log("voici le prenom il s'affiche bien : ", account.firstName);
              const pickupObservable = this.pickupService.takePickupByWorkSessionId(issue.workSessionId!);
              const taurusUsageObservable = this.taurusService.takeTaurusUsageByWorkSessionId(issue.workSessionId!);

              return forkJoin([pickupObservable, taurusUsageObservable]).pipe(
                switchMap(([pickup, taurusUsage]) => {
                  const cartNumberObservable = this.cartService.getCartById(pickup.cartId).pipe(map(cart => cart.cartNumber));
                  const taurusNumberObservable = this.taurusService.getTaurusById(taurusUsage.taurusId).pipe(map(taurus => taurus.taurusNumber));

                  return forkJoin([cartNumberObservable, taurusNumberObservable]).pipe(
                    map(([cartNumber, taurusNumber]) => ({
                      ...issue,
                      userFirstName: account.firstName,
                      account: account,  // Stocker l'account dans une propriété temporaire
                      cartNumber: cartNumber,
                      taurusNumber: taurusNumber
                    }))
                  );
                })
              );
            })
          );
        });

        forkJoin(issueDetailsObservables).pipe(
          map(resolvedIssues => resolvedIssues as any[])  // Change the type to any[]
        ).subscribe((resolvedIssues: any[]) => {  // Change the type to any[]
          console.log(resolvedIssues); // Ajouter un log pour vérifier les données
          this.issues = resolvedIssues;
        });
      });
    });
  }

  viewDetail(issue: Issue) {
    // Logic to view issue details
  }

  takeAction(issue: any) {  // Change the type to any
    const selectedIssue = this.issues.find(i => i.idIssue === issue.idIssue);
    if (selectedIssue) {
      this.resumeService.setIssueData(selectedIssue); // Ajouter l'issue au tableau dans le ResumeService
      this.resumeService.setAccountData(selectedIssue.account); // Stocker l'account correspondant
      this.router.navigate(['/dashboard/add-new-action-carried-out'], { queryParams: { issueId: selectedIssue.idIssue } }); // Passer l'ID du problème en tant que paramètre de route
    }
  }
}
