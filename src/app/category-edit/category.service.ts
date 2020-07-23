
import { Injectable } from '@angular/core';
import { Categories } from '../shared/category.model';
import { Subject } from 'rxjs';




@Injectable()
export class CategoryService {
  categoriesChanged = new Subject<Categories[]>();
  startedEditing = new Subject<number>();

  categories: Categories[] = [
    new Categories('Früchte'),
    new Categories('Gemüse'),
    new Categories('Brot'),
    new Categories('Milch'),
    new Categories('Fleisch'),
    new Categories('Backen'),
    new Categories('Teigwaren'),
    new Categories('Sonstiges'),
  ];

  getCategories() {
    // return this.categories.slice();
    // Todo: Look up asObservable
    return this.categoriesChanged.asObservable();
  }

  getCategory(index: number) {
    return this.categories[index];
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
