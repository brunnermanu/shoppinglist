
import { Injectable } from '@angular/core';
import { Categories } from '../shared/category.model';
import { Subject } from 'rxjs';
import {Recipe} from '../recipes/recipe.model';




@Injectable()
export class CategoryService {
  categoriesChanged = new Subject<Categories[]>();
  startedEditing = new Subject<number>();

  categories: Categories[] = [];

  // categories: Categories[] = [
  //   new Categories('Sonstiges'),
  // ];

  // method to overwrite the existing recipes
  setCategories(categories: Categories[]) {
    this.categories = categories;
    this.categoriesChanged.next(this.categories.slice());
  }

  getCategories() {
    return this.categories.slice();
  }

  getCategory(index: number) {
    return this.categories[index];
  }

  getUpdatedCategories() {
    return this.categoriesChanged.asObservable();
  }

  updateCategories(index: number, newCategory: Categories) {
    this.categories[index] = newCategory;
    this.categoriesChanged.next(this.categories.slice());
  }

  deleteCategory(index: number) {
    this.categories.splice(index, 1);
    this.categoriesChanged.next(this.categories.slice());
  }

  addCategory(category: Categories) {
    this.categories.push(category);
    this.categoriesChanged.next(this.categories.slice());
  }
}
