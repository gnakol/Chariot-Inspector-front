import { Injectable } from '@angular/core';
import { Account } from '../../user-package/bean/account';
import { Battery } from '../../battery-package/bean/battery';
import { TaurusUsage } from '../../taurus-package/bean/taurusUsage';
import { Pickup } from '../../pickup-package/bean/pickup';
import { Issue } from '../../issue-package/bean/issue';
import { AccountTeamDTO } from '../../account-team-package/bean/account-team';
import { BatteryUsage } from '../../battery-usage-package/bean/battery-usage';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  private accountData: Account | null = null;
  private batteryData: Battery[] = [];
  private batteryUsageData: BatteryUsage[] = [];
  private taurusUsageData: TaurusUsage | null = null;
  private pickupData: Pickup | null = null;
  private issueData: Issue[] = [];
  private accountTeamData: AccountTeamDTO | null = null;

  constructor() { }

  setAccountTeamData(accountTeam: AccountTeamDTO): void {
    this.accountTeamData = accountTeam;
  }

  getAccountTeamData(): AccountTeamDTO | null {
    return this.accountTeamData;
  }

  setAccountData(account: Account): void {
    this.accountData = account;
  }

  getAccountData(): Account | null {
    return this.accountData;
  }

  setBatteryData(batteries: Battery[]): void {
    this.batteryData = batteries;
  }

  getBatteryData(): Battery[] {
    return this.batteryData;
  }

  setBatteryUsageData(batteryUsages: BatteryUsage[]): void {
    this.batteryUsageData = batteryUsages;
  }

  getBatteryUsageData(): BatteryUsage[] {
    return this.batteryUsageData;
  }

  setTaurusUsageData(taurusUsage: TaurusUsage): void {
    this.taurusUsageData = taurusUsage;
  }

  getTaurusUsageData(): TaurusUsage | null {
    return this.taurusUsageData;
  }

  setPickupData(pickup: Pickup): void {
    this.pickupData = pickup;
  }

  getPickupData(): Pickup | null {
    return this.pickupData;
  }

  setIssueData(data: Issue | Issue[]): void {
    if (Array.isArray(data)) {
      this.issueData = data;
    } else {
      this.issueData.push(data);
    }
  }

  getIssueData(): Issue[] {
    return this.issueData;
  }

  clearData(): void {
    this.taurusUsageData = null;
    this.accountData = null;
    this.batteryData = [];
    this.batteryUsageData = [];
    this.pickupData = null;
    this.issueData = [];
    this.accountTeamData = null;
  }
}
