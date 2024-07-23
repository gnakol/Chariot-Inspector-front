import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResumeService } from '../../view-web-service/service/resume.service';
import { WorkSessionService } from '../../work-session-package/service/session.service';

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.scss']
})
export class SuiviComponent implements OnInit {

  isFormComplete = false;

  constructor(
    private router: Router, 
    private resumeService: ResumeService,
    private workSessionService : WorkSessionService
  ) { }

  ngOnInit(): void {
    this.checkFormCompletion();
  }

  navigateTo(page: string) {
    this.router.navigateByUrl(page);
  }

  checkFormCompletion() {
    const accountData = this.resumeService.getAccountData();
    const pickupData = this.resumeService.getPickupData();

    this.isFormComplete = !!accountData && !!pickupData;
  }

  validate() {
    
    const workSessionId = localStorage.getItem('workSessionId');

    if(workSessionId)
    {
      this.workSessionService.endWorkSession(workSessionId).subscribe(
        () => {
          console.log('Work session ended susccessfully');
          this.router.navigate(['/resume']);
        },
        error => {
          console.error('Failed to end work session:', error);
        }
      );
    }else
    {
      console.error('No work session ID found');
    }
  }
}
