import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';
import {CategoryService} from '../category-edit/category.service';
import {Categories} from './category.model';



@Injectable()
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private shoppingListService: ShoppingListService,
              private categoryService: CategoryService) {
  }

  getUser() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    } else {
      return userData.id;
    }
  }

  // with the put request, all recipes would be overwritten in the firebase-database
  storeRecipes() {
    const actualUser = this.getUser();
    if (actualUser) {
      const recipes = this.recipeService.getRecipes();
      return this.http.put(
        'https://shoppinglist-bb6ef.firebaseio.com/' + actualUser + '/recipes.json',
        recipes
      );
    }
  }

  fetchRecipes() {
    const actualUser = this.getUser();
    return this.http
      .get<Recipe[]>(
        'https://shoppinglist-bb6ef.firebaseio.com/' + actualUser + '/recipes.json')
      .pipe(
        map(recipes => {
          if (recipes) {
            return recipes.map( recipe => {
              return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
          } else {
            return [];
          }
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }

// with the put request, all ingredients would be overwritten in the firebase-database
  storeShoppingList() {
    const actualUser = this.getUser();
    const ingredients = this.shoppingListService.getIngredients();
    return this.http.put(
      'https://shoppinglist-bb6ef.firebaseio.com/' + actualUser + '/shoppinglist.json',
      ingredients
    );
  }

  fetchShoppingList() {
    const actualUser = this.getUser();
    return this.http
      .get<Ingredient[]>(
        'https://shoppinglist-bb6ef.firebaseio.com/' + actualUser + '/shoppinglist.json')
      .pipe(
        map(ingredients => {
          if (ingredients) {
            return ingredients.map(ingredient => {
              return {...ingredient, unit: ingredient.unit ? ingredient.unit : ''};
            });
          } else {
            return [];
          }
        }),
        tap(ingredients => {
          this.shoppingListService.setIngredients(ingredients);
        })
      );
  }

  storeCategories() {
    const actualUser = this.getUser();
    const categories = this.categoryService.getCategories();
    return this.http.put(
      'https://shoppinglist-bb6ef.firebaseio.com/' + actualUser + '/categories.json',
      categories
    );
  }

  fetchCategories() {
    const actualUser = this.getUser();
    return this.http
      .get<Categories[]>(
        'https://shoppinglist-bb6ef.firebaseio.com/' + actualUser + '/categories.json')
      .pipe(
        map(categories => {
          return categories ? categories : [new Categories('Sonstiges')];
        }),
        tap(categories => {
          this.categoryService.setCategories(categories);
        })
      );
    }

}
