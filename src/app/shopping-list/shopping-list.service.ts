import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { CategoryService } from '../category-edit/category.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  // Improve plural naming
  categories: string[];

  constructor(private categoryService: CategoryService) {
    this.categories = this.categoryService.categories.map(item => item.category);
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories.map(item => item.category);
      console.log('this.categories IN our new awesome method', this.categories);
    });
  }

  private ingredients: Ingredient[] = [
    new Ingredient(200, 'gr', 'Spaghetti', 'Teigwaren'),
    new Ingredient(5, 'stk', 'Äpfel', 'Früchte'),
  ];

  getIngredients() {
      return this.ingredients.sort(
        (a, b) =>
          this.categories.indexOf(a.category) - this.categories.indexOf(b.category)
      ).slice();
    }

  getIngredient(index: number) {
      return this.ingredients[index];
    }

  addIngredient(ingredient: Ingredient) {
      this.ingredients.push(ingredient);
      this.ingredientsChanged.next(this.ingredients.sort(
        (a, b) =>
          this.categories.indexOf(a.category) - this.categories.indexOf(b.category)
      ).slice());
    }

  addIngredients(ingredients: Ingredient[]) {
      this.ingredients.push(...ingredients);
      this.ingredientsChanged.next(this.ingredients.sort(
        (a, b) =>
          this.categories.indexOf(a.category) - this.categories.indexOf(b.category)
      ).slice());
    }

  updateIngredient(index: number, newIngredient: Ingredient) {
      this.ingredients[index] = newIngredient;
      this.ingredientsChanged.next(this.ingredients.sort(
        (a, b) =>
          this.categories.indexOf(a.category) - this.categories.indexOf(b.category)
      ).slice());
    }

  deleteIngredient(index: number) {
      this.ingredients.splice(index, 1);
      this.ingredientsChanged.next(this.ingredients.slice());
    }
}
