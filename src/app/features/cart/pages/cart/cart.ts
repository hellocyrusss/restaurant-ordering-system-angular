import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { CartService } from '../../../../core/services/cart.service';
import { CartItem } from '../../../../core/models/cart-item.model';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  increase(id: number) {
    this.cartService.increaseQty(id);
  }

  decrease(id: number) {
    this.cartService.decreaseQty(id);
  }

  remove(itemId: number) {
    this.cartService.removeFromCart(itemId);
  }

  clear() {
    this.cartService.clearCart();
  }
}
