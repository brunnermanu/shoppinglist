import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Categories } from '../shared/category.model';
import { DataStorageService } from '../shared/data-storage.service';
import { CategoryService } from './category.service';

@Injectable({providedIn: 'root'})
export class CategoryResolverService implements Resolve<Categories[]> {
  constructor(private dataStorageService: DataStorageService, private categoryService: CategoryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const categories = this.categoryService.getCategories();

    if (categories.length === 0) {
      return this.dataStorageService.fetchCategories();
    } else {
      return categories;
    }
  }
}
