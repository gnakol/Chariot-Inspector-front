import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../service/resume.service';
import { Account } from '../../user-package/bean/account';
import { Cart } from '../../cart-package/bean/cart';
import { Battery } from '../../battery-package/bean/battery';
import { TaurusUsage } from '../../taurus-package/bean/taurusUsage';
import { TaurusService } from '../../taurus-package/service/taurus.service';
import { Taurus } from '../../taurus-package/bean/taurus';
import { UserService } from '../../user-package/service/user.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  accountData: Account | null = null;
  cartData: Cart | null = null;
  batteryData: Battery | null = null;
  taurusUsageData: TaurusUsage | null = null;
  taurusData: Taurus | null = null;

  constructor(private resumeService: ResumeService, private taurusService: TaurusService, private userService : UserService) {}

  ngOnInit(): void {
    this.accountData = this.resumeService.getAccountData();
    this.cartData = this.resumeService.getCartData();
    this.batteryData = this.resumeService.getBatteryData();
    this.taurusUsageData = this.resumeService.getTaurusUsageData();

    if (this.taurusUsageData) {
      this.taurusService.getTaurusById(this.taurusUsageData.taurusId).subscribe(
        (taurusData) => {
          this.taurusData = taurusData;
        },
        (error) => {
          console.error('Error fetching taurus data:', error);
        }
      );

      this.userService.getAccountById(this.taurusUsageData.accountId).subscribe(
        (accountData) => {
          this.accountData = accountData;
        },
        error => {
          console.error('Error fetching data : ', error);
        }
      )
    }
  }
}
