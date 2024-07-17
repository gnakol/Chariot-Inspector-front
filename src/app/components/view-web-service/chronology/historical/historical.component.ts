import { Component, OnInit, ViewChild } from '@angular/core';
import { HistoricalService } from '../service/historical.service';
import { AuthService } from '../../../../authenticate/core/auth.service';
import { UserService } from '../../../user-package/service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HistoryEntryDTO } from '../bean/page';
import { ResumeService } from '../../service/resume.service';
import { Router } from '@angular/router';
import { CartService } from '../../../cart-package/service/cart.service';
import { IssueService } from '../../../issue-package/service/issue.service';
import { TaurusService } from '../../../taurus-package/service/taurus.service';
import { AccountTeamService } from '../../../account-team-package/service/account-team.service';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss']
})
export class HistoricalComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'cartNumber', 'taurusNumber', 'issue', 'usageDate', 'detail'];
  dataSource = new MatTableDataSource<HistoryEntryDTO>([]);
  accountData: any = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private historicalService: HistoricalService,
    private authService: AuthService,
    private accountService: UserService,
    private resumeService : ResumeService,
    private router : Router,
    private cartService : CartService,
    private issueService : IssueService, 
    private taurusService : TaurusService,
    private accountTeamService : AccountTeamService
  ) { }

  ngOnInit(): void {
    this.loadDataAccount();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadDataAccount(): void {
    const token = this.authService.getToken();

    if (token) {
      const payload = this.authService.parseJwt(token);
      const email = payload.sub;

      this.accountService.getUserIdByEmail(email).subscribe(accountIdResponse => {
        const idAccount = accountIdResponse;
        this.accountService.getAccountById(idAccount).subscribe(accountData => {
          this.accountData = accountData;
          this.loadAllData(idAccount);
        });
      });
    }
  }

  loadAllData(idAccount: number): void {
    this.historicalService.getHistory(idAccount, 0, 1000).subscribe(historyResponse => {
      console.log('History data:', historyResponse); // Ajoutez ceci pour vérifier les données
      this.dataSource.data = historyResponse.content;
    });
  }

  viewDetail(element: HistoryEntryDTO): void {
    this.resumeService.clearData();
    this.resumeService.setAccountData(this.accountData);
  
    // Retrieve Taurus ID by Taurus Number
    if (element.taurusNumber) {
      this.taurusService.getIdTaurusByNum(element.taurusNumber).subscribe(taurusIdResponse => {
        const taurusId = taurusIdResponse;
  
        // Retrieve Taurus Usage by Taurus ID
        this.taurusService.getTaurusUsageByTaurusId(taurusId).subscribe(taurusUsageData => {
          const workSessionId = taurusUsageData.workSessionId;
  
          this.resumeService.setTaurusUsageData({
            taurusId: taurusId,
            accountId: this.accountData.idAccount,
            usageDate: new Date(element.usageDate),
            workSessionId: workSessionId
          });
  
          // Ensure workSessionId is defined before making the API call
          if (workSessionId) {
            // Retrieve AccountTeam by Work Session ID
            this.accountTeamService.getAccountTeamByWorkSessionId(workSessionId).subscribe(accountTeamData => {
              this.resumeService.setAccountTeamData(accountTeamData);
  
              // Retrieve Cart Data by Cart Number
              if (element.cartNumber) {
                this.cartService.getIdCartByNum(element.cartNumber).subscribe(cartIdResponse => {
                  const idCart = cartIdResponse;
                  this.cartService.getCartById(idCart).subscribe(cartData => {
                    this.resumeService.setCartData(cartData);
  
                    // Set Battery Data if available
                    if (element.batteryDTOS && element.batteryDTOS.length > 0) {
                      this.resumeService.setBatteryData(element.batteryDTOS[0]);
                    }
  
                    // Retrieve and set Issue Data by Work Session ID
                    if (workSessionId) {
                      this.issueService.getIdIssueByWorkSessionId(workSessionId).subscribe(idIssueResponse => {
                        const idIssue = idIssueResponse;
                        this.issueService.getIssueById(idIssue).subscribe(issueData => {
                          this.resumeService.setIssueData(issueData);
  
                          // Navigate to resume page
                          this.router.navigate(['/resume']);
                        });
                      });
                    } else {
                      // Navigate to resume page if workSessionId is not available
                      this.router.navigate(['/resume']);
                    }
                  });
                });
              } else {
                // Navigate to resume page if no cart number is provided
                this.router.navigate(['/resume']);
              }
            });
          } else {
            console.error('Work Session ID is undefined');
          }
        });
      });
    } else {
      // Navigate to resume page if no taurus number is provided
      this.router.navigate(['/resume']);
    }
  }
}
