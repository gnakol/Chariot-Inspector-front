import { Component, OnInit } from '@angular/core';
import { Cart } from '../../bean/cart';
import { MatTableDataSource } from '@angular/material/table';
import { CartService } from '../../service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-cart',
  templateUrl: './all-cart.component.html',
  styleUrls: ['./all-cart.component.scss']
})
export class AllCartComponent implements OnInit {
  dataSource = new MatTableDataSource<Cart>();
  filteredData: Cart[] = [];
  pagedData: Cart[] = [];
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.allCart().subscribe(data => {
      console.log(data);
      this.dataSource.data = data.content;
      this.filteredData = data.content;
      this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
      this.updatePagedData();
    }, error => {
      console.log('Error fetching cart: ', error);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredData = this.dataSource.data.filter(cart => cart.cartNumber.toString().toLowerCase().includes(filterValue));
    this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
    this.currentPage = 0;
    this.updatePagedData();
  }

  updatePagedData(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.pagedData = this.filteredData.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updatePagedData();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePagedData();
    }
  }

  viewDetails(cart: Cart): void {
    console.log('Voir les détails du chariot:', cart);
  }

  home() {
    this.router.navigateByUrl("/home");
  }
}
