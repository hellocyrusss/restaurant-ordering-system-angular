import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MenuService } from '../../../../core/services/menu.service';
import { CartService } from '../../../../core/services/cart.service';
import { MenuItem } from '../../../../core/models/menu-item.model';

import { RecommendedHighlight } from '../../../../shared/directives/recommended-highlight';
import { CategoryFilterPipe } from '../../../../shared/pipes/category-filter-pipe';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    CategoryFilterPipe,
    RecommendedHighlight
  ],
  templateUrl: './menu-list.html',
  styleUrl: './menu-list.css'
})
export class MenuList implements OnInit {
  menuItems: MenuItem[] = [];

  selectedCategory = 'All';
  categories: string[] = [
    'All',
    'Burgers',
    'Fries',
    'Starters',
    'Pizza',
    'Pasta',
    'Wraps',
    'Desserts',
    'Beverages'
  ];

  constructor(
    private menuService: MenuService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.menuService.getMenuItems().subscribe({
      next: (data) => (this.menuItems = data),
      error: (err) => console.error(err)
    });
  }

  openDetail(id: number) {
    this.router.navigate(['/menu', id]);
  }

  add(item: MenuItem) {
    this.cartService.addToCart(item);
  }
}
