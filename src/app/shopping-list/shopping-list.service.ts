import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';


export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient(5, 'stk', 'Äpfel', 1),
    new Ingredient(200, 'gr', 'Spaghetti', 4),
  ];

  getIngredients() {

    return this.ingredients.sort((a, b) => a.category - b.category).slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient, index: number) {
    this.ingredients.sort((a, b) => a.category - b.category).push(ingredient);
    this.ingredientsChanged.next(this.ingredients.sort((a, b) => a.category - b.category).slice());
  }

  addIngredients(ingredients: Ingredient[], index: number) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.sort((a, b) => a.category - b.category).slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.sort((a, b) => a.category - b.category).slice());
  }

  deleteIngredient(index: number) {
  this.ingredients.splice(index, 1);
  this.ingredientsChanged.next(this.ingredients.slice());
  }
}
