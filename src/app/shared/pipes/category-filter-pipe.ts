import { Pipe, PipeTransform } from '@angular/core';
import { MenuItem } from '../../core/models/menu-item.model';

@Pipe({
  name: 'categoryFilter',
  standalone: true
})
export class CategoryFilterPipe implements PipeTransform {
  transform(items: MenuItem[] = [], category: string = 'All'): MenuItem[] {
    if (!category || category === 'All') return items;
    return items.filter(i => i.category === category);
  }
}
