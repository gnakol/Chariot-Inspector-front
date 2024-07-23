import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Battery } from '../../bean/battery';
import { BatteryService } from '../../service/battery.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-battery',
  templateUrl: './all-battery.component.html',
  styleUrl: './all-battery.component.scss'
})
export class AllBatteryComponent {

  dataSource = new MatTableDataSource<Battery>();
  filteredData: Battery[] = [];
  pagedData: Battery[] = [];
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;

  constructor(private batteryService: BatteryService, private router: Router) { }

  ngOnInit(): void {
    this.batteryService.allBattery().subscribe(data => {
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
    this.filteredData = this.dataSource.data.filter(battery => battery.batteryNumber.toString().toLowerCase().includes(filterValue));
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

  viewDetails(cart: Battery): void {
    console.log('Voir les détails du chariot:', cart);
  }

  home() {
    this.router.navigateByUrl("/home");
  }

}
