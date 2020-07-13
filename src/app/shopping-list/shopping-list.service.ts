import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';


export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  categories = ['Früchte','Gemüse', 'Brot', 'Milchprodukte', 'Fleisch', 'Mehl', 'Teigwaren', 'Dosen', 'Eingemachtes', 'Pflegeprodukte', 'Putzmittel', 'Sonstiges'];

  private ingredients: Ingredient[] = [
    new Ingredient(5, 'stk', 'Äpfel', 'Früchte'),
    new Ingredient(200, 'gr', 'Spaghetti', 'Teigwaren'),
  ];

getIngredients() {
    return this.ingredients.sort((a, b) => this.categories.indexOf(a.category) - this.categories.indexOf(b.category)).slice();
  }

getIngredient(index: number) {
    return this.ingredients[index];
  }

addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.sort((a, b) => this.categories.indexOf(a.category) - this.categories.indexOf(b.category)).slice());
  }

addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.sort((a, b) => this.categories.indexOf(a.category) - this.categories.indexOf(b.category)).slice());
  }

updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.sort((a, b) => this.categories.indexOf(a.category) - this.categories.indexOf(b.category)).slice());
  }

deleteIngredient(index: number) {
  this.ingredients.splice(index, 1);
  this.ingredientsChanged.next(this.ingredients.sort((a, b) => this.categories.indexOf(a.category) - this.categories.indexOf(b.category)).slice());
  }
}
