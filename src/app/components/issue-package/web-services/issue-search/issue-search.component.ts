import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamDTO } from '../../../team-package/bean/team';
import { TeamService } from '../../../team-package/service/team.service';
import { TeamResponse } from '../../../team-package/bean/page';

@Component({
  selector: 'app-issue-search',
  templateUrl: './issue-search.component.html',
  styleUrls: ['./issue-search.component.scss']
})
export class IssueSearchComponent implements OnInit {

  teams : TeamDTO[] = []; 

  selectedTeamId! : number;

  startDate! : string;

  endDate! : string;

  constructor(private router: Router, private teamService : TeamService) {}

  ngOnInit(): void {
      
    this.teamService.allTeam(0, 100).subscribe((response) => {
      console.log(response.content);
      this.teams = response.content;
    });
  }

  search() {
    this.router.navigate(['/dashboard/all-issue-action'], {
      queryParams: {
        teamId: this.selectedTeamId,
        startDate: this.startDate,
        endDate: this.endDate,
        page: 0,
        size: 10
      }
    });
  }
}
