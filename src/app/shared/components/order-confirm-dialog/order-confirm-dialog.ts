import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-order-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './order-confirm-dialog.html',
  styleUrl: './order-confirm-dialog.css'
})
export class OrderConfirmDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { total: number }) {}
}
