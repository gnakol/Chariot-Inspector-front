import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../service/resume.service';
import { Account } from '../../user-package/bean/Account';
import { Cart } from '../../cart-package/bean/cart';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  accountData: Account | null = null;

  cartData: Cart | null = null;

  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    
    this.accountData = this.resumeService.getAccountData();

    this.cartData = this.resumeService.getCartData();
  }
}
