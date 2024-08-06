import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WareHouseService } from '../../service/ware-house.service';
import { Router } from '@angular/router';
import { WareHouseDTO } from '../../bean/ware-house';

@Component({
  selector: 'app-add-ware-house',
  templateUrl: './add-ware-house.component.html',
  styleUrl: './add-ware-house.component.scss'
})
export class AddWareHouseComponent implements OnInit {

  wareHouseForm! : FormGroup;

  constructor(
    private fb : FormBuilder,
    private wareHouseService : WareHouseService,
    private router : Router
  ){}

  ngOnInit(): void {
      this.wareHouseForm = this.fb.group({
        name : ['', Validators.required]
      });
  }

  onSubmit(): void {
    if (this.wareHouseForm.valid) {
      const newWareHouse: WareHouseDTO = this.wareHouseForm.value;
      this.wareHouseService.addNewWareHouse(newWareHouse).subscribe(
        (data) => {
          console.log('Entrepôt ajoutée avec succès', data);
          this.router.navigate(['/dashboard/battery-template']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'entrepôt', error);
        }
      );
    }
  }

}
