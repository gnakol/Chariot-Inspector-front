import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ResumeService } from '../service/resume.service';
import { Account } from '../../user-package/bean/account';
import { TaurusUsage } from '../../taurus-package/bean/taurusUsage';
import { TaurusService } from '../../taurus-package/service/taurus.service';
import { Taurus } from '../../taurus-package/bean/taurus';
import { UserService } from '../../user-package/service/user.service';
import { Pickup } from '../../pickup-package/bean/pickup';
import { PickupService } from '../../pickup-package/service/pickup.service';
import { Issue } from '../../issue-package/bean/issue';
import { AccountTeamDTO } from '../../account-team-package/bean/account-team';
import { TeamService } from '../../team-package/service/team.service';
import { ShiftService } from '../../shift-package/service/shift.service';
import { forkJoin } from 'rxjs';
import { BatteryUsage } from '../../battery-usage-package/bean/battery-usage';
import { CartService } from '../../cart-package/service/cart.service';
import { BatteryService } from '../../battery-package/service/battery.service';
import { AccountServiceDTO } from '../../service-bean-package/bean/sevice-bean';
import { ServiceBeanService } from '../../service-bean-package/service-bean.service';

interface CartNode {
  item: string;
  children?: CartNode[];
}

interface CartFlatNode {
  expandable: boolean;
  item: string;
  level: number;
}

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  accountData: Account | null = null;
  accountServiceData : AccountServiceDTO | null = null;
  batteryUsageData: BatteryUsage[] = [];
  taurusUsageData: TaurusUsage | null = null;
  taurusData: Taurus | null = null;
  pickupData: Pickup | null = null;
  issueData: Issue[] = [];
  accountTeamData: AccountTeamDTO | null = null;
  teamName: string | null = null;
  shiftName: string | null = null;
  cartNumber : string | null = null;
  batteryNumber : Map<number, number> = new Map();

  private transformer = (node: CartNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      item: node.item,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<CartFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private resumeService: ResumeService,
    private taurusService: TaurusService,
    private userService: UserService,
    private pickupService: PickupService,
    private teamService: TeamService,
    private shiftService: ShiftService,
    private cartService : CartService,
    private batteryService : BatteryService,
    private serviceBeanService : ServiceBeanService
  ) {}

  ngOnInit(): void {
    this.accountData = this.resumeService.getAccountData();
    this.batteryUsageData = this.resumeService.getBatteryUsageData() || [];
    this.taurusUsageData = this.resumeService.getTaurusUsageData();
    this.pickupData = this.resumeService.getPickupData();
    this.issueData = this.resumeService.getIssueData() || [];
    this.accountTeamData = this.resumeService.getAccountTeamData();

    if (this.accountData) {
      this.serviceBeanService.getAccountServiceBeanById(this.accountData.accountServiceBeanId).subscribe(
        (serviceData) => {
          this.accountServiceData = serviceData;
        },
        (error) => {
          console.error('Error fetching service data:', error);
        }
      );
    }

    if(this.pickupData)
    {
      this.cartService.getCartById(this.pickupData.cartId).subscribe(cart => {
        this.cartNumber = cart.cartNumber;
      })
    }

    this.batteryUsageData.forEach(batteryUsage => {
      this.batteryService.getBatteryById(batteryUsage.batteryId).subscribe(battery => {
        this.batteryNumber.set(batteryUsage.batteryId, battery.batteryNumber);
      });
    });
  
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
      );
  
      if (this.accountTeamData) {
        forkJoin({
          team: this.teamService.getTeamById(this.accountTeamData.teamId),
          shift: this.shiftService.getShiftById(this.accountTeamData.shiftId)
        }).subscribe(
          ({ team, shift }) => {
            this.teamName = team.name;
            this.shiftName = shift.name;
          },
          error => {
            console.error('Error fetching team or shift data:', error);
          }
        );
      }
    }
  }
  

  // hasChild = (_: number, node: CartFlatNode) => node.expandable;

  // private initializeTreeData() {
  //   const cartTreeData: CartNode[] = [
  //     {
  //       item: 'Numéro du Chariot: ' + this.pickupData?.cartId,
  //       children: [
  //         { item: 'État du châssis / carter: ' + this.pickupData?.conditionChassis },
  //         { item: 'Roues non déchirées et absence de plat: ' + this.pickupData?.wheelsTornPlat },
  //         { item: 'Câbles et prises batterie: ' + this.pickupData?.batteryCablesSockets },
  //         { item: 'État des fourches: ' + this.pickupData?.conditionForks },
  //         { item: 'Plateforme propre et anti-dérapante: ' + this.pickupData?.cleanNonSlipPlatform },
  //         { item: 'Pare-brise: ' + this.pickupData?.windshield },
  //         { item: 'Bloc gaz + sangle: ' + this.pickupData?.gasBlockStrap },
  //         { item: 'Commandes de marche avant/arrière: ' + this.pickupData?.forwardReverseControl },
  //         { item: 'Klaxon: ' + this.pickupData?.honk },
  //         { item: 'Système d\'élévation fonctionnel: ' + this.pickupData?.functionalElevationSystem },
  //         { item: 'Arrêt d\'urgence: ' + this.pickupData?.emergencyStop },
  //         { item: 'Absence de fuite: ' + this.pickupData?.noLeak },
  //         { item: 'Bouton anti écrasement: ' + this.pickupData?.antiCrushButton },
  //         { item: 'Date et heure de prise en charge: ' + this.pickupData?.pickupDateTime },
  //         { item: 'Date et heure de retour: ' + this.pickupData?.returnDateTime }
  //       ]
  //     }
  //   ];

  //   this.dataSource.data = cartTreeData;
  // }
}
