import { Component, OnInit, ViewChild } from '@angular/core';
import { HistoricalService } from '../service/historical.service';
import { AuthService } from '../../../../authenticate/core/auth.service';
import { UserService } from '../../../user-package/service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ResumeService } from '../../service/resume.service';
import { Router } from '@angular/router';
import { PickupService } from '../../../pickup-package/service/pickup.service';
import { AccountTeamService } from '../../../account-team-package/service/account-team.service';
import { Issue } from '../../../issue-package/bean/issue';
import { HistoryEntryDTO } from '../bean/page';
import { BatteryUsageService } from '../../../battery-usage-package/service/battery-usage.service';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss']
})
export class HistoricalComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'cartNumber', 'taurusNumber', 'issue', 'usageDate', 'batteries', 'detail'];
  dataSource = new MatTableDataSource<HistoryEntryDTO>([]);
  accountData: any = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private historicalService: HistoricalService,
    private authService: AuthService,
    private accountService: UserService,
    private resumeService: ResumeService,
    private router: Router,
    private pickupService: PickupService,
    private batteryUsageService: BatteryUsageService,
    private accountTeamService: AccountTeamService
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
      console.log('History data:', historyResponse);
      this.dataSource.data = historyResponse.content;
    });
  }

  viewDetail(element: HistoryEntryDTO): void {
    this.resumeService.clearData();
    this.resumeService.setAccountData(this.accountData);
  
    if (element.cartNumber) {
      this.pickupService.getIdPickupByCartNumber(element.cartNumber).subscribe(pickupIds => {
        if (pickupIds && pickupIds.length > 0) {
          const idPickup = pickupIds[0];
          this.pickupService.getPickupById(idPickup).subscribe(pickupData => {
            this.resumeService.setPickupData(pickupData);
  
            this.batteryUsageService.getBatteryUsageByCartId(pickupData.cartId).subscribe(batteryUsageData => {
              if (Array.isArray(batteryUsageData)) {
                this.resumeService.setBatteryUsageData(batteryUsageData);
              } else {
                console.error('batteryUsageData is not an array:', batteryUsageData);
              }
  
              if (element.issueDescription) {
                const issueData: Issue = {
                  idIssue: 0, 
                  accountId: this.accountData.idAccount,
                  description: element.issueDescription,
                  createdAt: element.usageDate
                };
                this.resumeService.setIssueData([issueData]);
              }
  
              this.router.navigate(['/resume']);
            });
          });
        } else {
          console.error('No pickup IDs found for cart number:', element.cartNumber);
        }
      });
    } else {
      this.router.navigate(['/resume']);
    }
  }
  
}
