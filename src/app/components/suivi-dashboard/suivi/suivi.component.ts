import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResumeService } from '../../view-web-service/service/resume.service';

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.scss']
})
export class SuiviComponent implements OnInit {

  isFormComplete = false;

  constructor(private router: Router, private resumeService: ResumeService) { }

  ngOnInit(): void {
    this.checkFormCompletion();
  }

  navigateTo(page: string) {
    this.router.navigateByUrl(page);
  }

  checkFormCompletion() {
    const accountData = this.resumeService.getAccountData();
    const cartData = this.resumeService.getCartData();

    this.isFormComplete = !!accountData && !!cartData;
  }

  validate() {
    this.router.navigate(['/resume']);
  }
}
