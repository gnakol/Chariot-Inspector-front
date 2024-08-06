import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { WareHouseDTO } from '../../bean/ware-house';
import { WareHouseService } from '../../service/ware-house.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-ware-house',
  templateUrl: './all-ware-house.component.html',
  styleUrl: './all-ware-house.component.scss'
})
export class AllWareHouseComponent {

  dataSource = new MatTableDataSource<WareHouseDTO>();
  filteredData: WareHouseDTO[] = [];
  pagedData: WareHouseDTO[] = [];
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;

  constructor(private warehouseService: WareHouseService, private router: Router) {}

  ngOnInit(): void {
    this.warehouseService.getAllWareHouse().subscribe(data => {
      console.log(data);
      this.dataSource.data = data.content;
      this.filteredData = data.content;
      this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
      this.updatePagedData();
    }, error => {
      console.log('Error fetching warehouses: ', error);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredData = this.dataSource.data.filter(warehouse => warehouse.name.toLowerCase().includes(filterValue));
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

  viewDetails(warehouse: WareHouseDTO): void {
    console.log('Voir les détails de l\'entrepôt:', warehouse);
  }

}
