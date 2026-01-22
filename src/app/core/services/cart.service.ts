import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from '../models/menu-item.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  getCart(): CartItem[] {
    return this.cartSubject.value;
  }

  addToCart(item: MenuItem) {
    const cart = this.getCart();
    const found = cart.find((ci) => ci.item.id === item.id);

    if (found) {
      found.quantity += 1;
    } else {
      cart.push({ item, quantity: 1 });
    }

    this.cartSubject.next([...cart]);
  }

  removeFromCart(itemId: number) {
    const updated = this.getCart().filter((ci) => ci.item.id !== itemId);
    this.cartSubject.next(updated);
  }

  // ✅ increase quantity
  increaseQty(itemId: number) {
    const cart = this.getCart();
    const found = cart.find((ci) => ci.item.id === itemId);

    if (found) {
      found.quantity += 1;
      this.cartSubject.next([...cart]);
    }
  }

  // ✅ decrease quantity
  decreaseQty(itemId: number) {
    const cart = this.getCart();
    const found = cart.find((ci) => ci.item.id === itemId);

    if (!found) return;

    found.quantity -= 1;

    if (found.quantity <= 0) {
      this.removeFromCart(itemId);
      return;
    }

    this.cartSubject.next([...cart]);
  }

  clearCart() {
    this.cartSubject.next([]);
  }

  getTotal(): number {
    return this.getCart().reduce(
      (sum, ci) => sum + ci.item.price * ci.quantity,
      0
    );
  }
}
