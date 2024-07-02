import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ResumeService } from '../service/resume.service';
import { Account } from '../../user-package/bean/account';
import { Cart } from '../../cart-package/bean/cart';
import { Battery } from '../../battery-package/bean/battery';
import { TaurusUsage } from '../../taurus-package/bean/taurusUsage';
import { TaurusService } from '../../taurus-package/service/taurus.service';
import { Taurus } from '../../taurus-package/bean/taurus';
import { UserService } from '../../user-package/service/user.service';
import { Pickup } from '../../pickup-package/bean/pickup';
import { PickupService } from '../../pickup-package/service/pickup.service';
import { Issue } from '../../issue-package/bean/issue';

/** Interface for the tree node */
interface CartNode {
  item: string;
  children?: CartNode[];
}

/** Flat node with expandable and level information */
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
  cartData: Cart | null = null;
  batteryData: Battery | null = null;
  taurusUsageData: TaurusUsage | null = null;
  taurusData: Taurus | null = null;
  pickupData: Pickup | null = null;
  issueData: Issue[] = [];

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

  constructor(private resumeService: ResumeService, 
    private taurusService: TaurusService, 
    private userService: UserService,
    private pickupService: PickupService) {}

  ngOnInit(): void {
    this.accountData = this.resumeService.getAccountData();
    this.cartData = this.resumeService.getCartData();
    this.batteryData = this.resumeService.getBatteryData();
    this.taurusUsageData = this.resumeService.getTaurusUsageData();
    this.pickupData = this.resumeService.getPickupData();
    this.issueData = this.resumeService.getIssueData() || [];

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

    this.initializeTreeData();
  }

  hasChild = (_: number, node: CartFlatNode) => node.expandable;

  private initializeTreeData() {
    const cartTreeData: CartNode[] = [
      {
        item: 'Numéro du Chariot: ' + this.cartData?.cartNumber,
        children: [
          { item: 'État du châssis / carter: ' + this.cartData?.conditionChassis },
          { item: 'Roues non déchirées et absence de plat: ' + this.cartData?.wheelsTornPlat },
          { item: 'Câbles et prises batterie: ' + this.cartData?.batteryCablesSockets },
          { item: 'État des fourches: ' + this.cartData?.conditionForks },
          { item: 'Plateforme propre et anti-dérapante: ' + this.cartData?.cleanNonSlipPlatform },
          { item: 'Pare-brise: ' + this.cartData?.windshield },
          { item: 'Bloc gaz + sangle: ' + this.cartData?.gasBlockStrap },
          { item: 'Commandes de marche avant/arrière: ' + this.cartData?.forwardReverseControl },
          { item: 'Klaxon: ' + this.cartData?.honk },
          { item: 'Système d\'élévation fonctionnel: ' + this.cartData?.functionalElevationSystem },
          { item: 'Arrêt d\'urgence: ' + this.cartData?.emergencyStop },
          { item: 'Absence de fuite: ' + this.cartData?.noLeak },
          { item: 'Bouton anti écrasement: ' + this.cartData?.antiCrushButton },
          { item: 'Date et heure de prise en charge: ' + this.pickupData?.pickupDateTime },
          { item: 'Date et heure de retour: ' + this.pickupData?.returnDateTime }
        ]
      }
    ];

    this.dataSource.data = cartTreeData;
  }
}
