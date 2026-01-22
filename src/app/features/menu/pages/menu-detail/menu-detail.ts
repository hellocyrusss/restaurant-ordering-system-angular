import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { MenuService } from '../../../../core/services/menu.service';
import { CartService } from '../../../../core/services/cart.service';

import { MenuItem } from '../../../../core/models/menu-item.model';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-menu-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatChipsModule],
  templateUrl: './menu-detail.html',
  styleUrl: './menu-detail.css'
})
export class MenuDetail implements OnInit {
  item?: MenuItem;

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.menuService.getMenuItemById(id).subscribe({
      next: (data) => (this.item = data),
      error: (err) => console.error(err)
    });
  }

  addToCart() {
    if (!this.item) return;
    this.cartService.addToCart(this.item);
  }
}
