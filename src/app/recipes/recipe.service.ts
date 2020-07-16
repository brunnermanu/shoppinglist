import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';



@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();


  private recipes: Recipe[] = [
    new Recipe('Älplermagronen',
      'This is simply a Test',
      'https://res.cloudinary.com/swissmilk/image/fetch/q_auto,f_auto/' +
      'https://api.swissmilk.ch/wp-content/uploads/2019/05/ss-alltagsrezepte-winter-geschmortes-wintergemuese-mit-poulet.jpg',
      [
        new Ingredient(300, 'gr', 'Teigwaren', 'Teigwaren'),
        new Ingredient(2, 'stk', 'Zwiebeln',  'Gemüse')
      ]),
    new Recipe('Thaicurry',
      'This is simply a Test',
      'https://res.cloudinary.com/swissmilk/image/fetch/q_auto,f_auto/' +
      'https://api.swissmilk.ch/wp-content/uploads/2019/05/ss-alltagsrezepte-winter-geschmortes-wintergemuese-mit-poulet.jpg',
      [
        new Ingredient(5, 'Stück', 'Kartoffeln', 'Früchte'),
        new Ingredient(200, 'Gr', 'Reis', 'Sonstiges')
      ]),
  ];

  constructor(private shoppingListService: ShoppingListService) {
  }
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
