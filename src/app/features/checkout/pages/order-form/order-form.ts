import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import { Router } from '@angular/router';

import { CartService } from '../../../../core/services/cart.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OrderConfirmDialog } from '../../../../shared/components/order-confirm-dialog/order-confirm-dialog';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,

    MatDialogModule
  ],
  templateUrl: './order-form.html',
  styleUrl: './order-form.css'
})
export class OrderForm {
  total = 0;
  checkoutForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.total = this.cartService.getTotal();

    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      paymentMethod: ['CARD', Validators.required]
    });
  }

  placeOrder() {
    if (this.checkoutForm.invalid) {
      this.snackBar.open('Please fill all required fields correctly!', 'Close', {
        duration: 2500
      });
      return;
    }

    const totalAmount = this.cartService.getTotal();

    const dialogRef = this.dialog.open(OrderConfirmDialog, {
      width: '380px',
      data: { total: totalAmount }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) return;

      this.snackBar.open('✅ Order placed successfully!', 'Close', {
        duration: 2500
      });

      this.cartService.clearCart();

      setTimeout(() => {
        this.router.navigate(['/menu']);
      }, 1000);
    });

    this.cartService.cart$.subscribe(() => {
  this.total = this.cartService.getTotal();
});
  }
}
