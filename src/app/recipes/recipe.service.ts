import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';


@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('Älplermagronen',
      'This is simply a Test',
      'https://res.cloudinary.com/swissmilk/image/fetch/q_auto,f_auto/' +
      'https://api.swissmilk.ch/wp-content/uploads/2019/05/ss-alltagsrezepte-winter-geschmortes-wintergemuese-mit-poulet.jpg',
      [
        new Ingredient(300, 'gr', 'Teigwaren'),
        new Ingredient(2, 'stk', 'Zwiebeln')
      ]),
    new Recipe('Thaicurry',
      'This is simply a Test',
      'https://res.cloudinary.com/swissmilk/image/fetch/q_auto,f_auto/' +
      'https://api.swissmilk.ch/wp-content/uploads/2019/05/ss-alltagsrezepte-winter-geschmortes-wintergemuese-mit-poulet.jpg',
      [
        new Ingredient(5, 'Stück', 'Kartoffeln'),
        new Ingredient(200, 'Gr', 'Reis')
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

}
