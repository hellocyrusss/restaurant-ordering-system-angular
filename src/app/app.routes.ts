import { Routes } from '@angular/router';

import { cartGuard } from './core/guards/cart-guard';

import { MenuList } from './features/menu/pages/menu-list/menu-list';
import { MenuDetail } from './features/menu/pages/menu-detail/menu-detail';
import { Cart } from './features/cart/pages/cart/cart';
import { OrderForm } from './features/checkout/pages/order-form/order-form';

import { About } from './features/about/pages/about/about';
import { Offers } from './features/offers/pages/offers/offers';

export const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },

  { path: 'menu', component: MenuList },
  { path: 'menu/:id', component: MenuDetail },

  { path: 'cart', component: Cart },
  { path: 'checkout', component: OrderForm, canActivate: [cartGuard] },

  { path: 'about', component: About },
  { path: 'offers', component: Offers },

  { path: '**', redirectTo: 'menu' }
];
