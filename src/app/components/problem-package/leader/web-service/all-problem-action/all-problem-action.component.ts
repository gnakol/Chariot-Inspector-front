import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Issue } from '../../../../issue-package/bean/issue';
import { IssueService } from '../../../../issue-package/service/issue.service';
import { IssueResponse } from '../../../../issue-package/bean/page';

@Component({
  selector: 'app-all-problem-action',
  templateUrl: './all-problem-action.component.html',
  styleUrls: ['./all-problem-action.component.scss']
})
export class AllProblemActionComponent implements OnInit {
  issues: Issue[] = [];
  displayedColumns: string[] = ['counter', 'firstName', 'cartNumber', 'taurusNumber', 'issue', 'usageDate', 'detail', 'action'];

  constructor(private route: ActivatedRoute, private issueService: IssueService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const teamId = params['teamId'];
      console.log(teamId);
      const startDate = params['startDate'];
      console.log(startDate);
      const endDate = params['endDate'];
      console.log(endDate);
      const page = params['page'];
      console.log(page);
      const size = params['size'];
      console.log(size);

      this.issueService.getAllIssuesWithoutAction(teamId, startDate, endDate, page, size).subscribe((data: IssueResponse) => {
        console.log(data.content);
        this.issues = data.content;
      });
    });
  }

  viewDetail(issue: Issue) {
    // Logic to view issue details
  }

  takeAction(issue: Issue) {
    // Logic to take action on the issue
  }
}
