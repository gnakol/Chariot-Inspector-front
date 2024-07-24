import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionCarriedOutDTO } from '../../bean/action-carried-out';
import { ActionCarriedOutService } from '../../service/action-carried-out.service';
import { ResumeService } from '../../../view-web-service/service/resume.service';

@Component({
  selector: 'app-add-action-carried-out',
  templateUrl: './add-action-carried-out.component.html',
  styleUrls: ['./add-action-carried-out.component.scss']
})
export class AddActionCarriedOutComponent implements OnInit {

  actionCarriedOut: ActionCarriedOutDTO = {
    idActionCarriedOut: 0,
    description: '',
    issueId: 0,
    accountId: 0
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private actionCarriedOutService: ActionCarriedOutService,
    private resumeService: ResumeService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const issueId = +params['issueId'];
      const account = this.resumeService.getAccountData();

      if (issueId && account) {
        this.actionCarriedOut.issueId = issueId;
        this.actionCarriedOut.accountId = account.idAccount;
      } else {
        console.error('Issue or Account data is missing');
        // Redirect or handle the error
      }
    });
  }

  onSubmit() {
    this.actionCarriedOutService.addNewActionCarriedOut(this.actionCarriedOut).subscribe(() => {
      this.router.navigate(['/dashboard/all-issue-action']);
    });
  }
}
