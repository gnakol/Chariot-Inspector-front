import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-pickup',
  templateUrl: './remove-pickup.component.html',
  styleUrls: ['./remove-pickup.component.scss']
})
export class RemovePickupComponent {

  constructor(public dialogRef: MatDialogRef<RemovePickupComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
