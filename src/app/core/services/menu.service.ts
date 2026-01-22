import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from '../models/menu-item.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private jsonUrl = '/data/menu.json';  // ✅ because your file is in public/data

  constructor(private http: HttpClient) {}

  getMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.jsonUrl);
  }

  getMenuItemById(id: number): Observable<MenuItem> {
    return this.getMenuItems().pipe(
      map(items => items.find(i => i.id === id) as MenuItem)
    );
  }
}
