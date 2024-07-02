import { Component, OnInit, ViewChild } from '@angular/core';
import { HistoricalService } from '../service/historical.service';
import { AuthService } from '../../../../authenticate/core/auth.service';
import { UserService } from '../../../user-package/service/user.service';
import { CartService } from '../../../cart-package/service/cart.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss']
})
export class HistoricalComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'cartNumber', 'taurusNumber', 'issue', 'detail'];
  dataSource = new MatTableDataSource<any>([]);
  accountData: any = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private historicalService: HistoricalService,
    private authService: AuthService,
    private accountService: UserService,
    private cartService: CartService
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
    this.historicalService.allTaurusByAccount(idAccount, 0, 1000).subscribe(taurusResponse => {
      const taurusData = taurusResponse.content.map(t => ({
        firstName: this.accountData.firstName,
        cartNumber: '',
        taurusNumber: t.taurusNumber,
        issue: ''
      }));
      this.dataSource.data = [...this.dataSource.data, ...taurusData];

      this.historicalService.allIssueByAccount(idAccount, 0, 1000).subscribe(issueResponse => {
        const issueData = issueResponse.content.map(i => ({
          firstName: this.accountData.firstName,
          cartNumber: '',
          taurusNumber: '',
          issue: i.description
        }));
        this.dataSource.data = [...this.dataSource.data, ...issueData];

        this.historicalService.allCartByAccount(idAccount, 0, 1000).subscribe(cartResponse => {
          const cartData = cartResponse.content.map(c => ({
            firstName: this.accountData.firstName,
            cartNumber: c.cartNumber,
            taurusNumber: '',
            issue: ''
          }));
          this.dataSource.data = [...this.dataSource.data, ...cartData];
        });
      });
    });
  }

  viewDetail(element: any): void {
    console.log('View detail for:', element);
    // Navigation logic to detail page can be added here
  }
}
