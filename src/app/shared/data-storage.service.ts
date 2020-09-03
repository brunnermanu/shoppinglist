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

  storeRecipes() {
    const actualUser = this.getUser();
    if (actualUser) {
      const recipes = this.recipeService.getRecipes();
      this.http.put(
        'https://shoppinglist-bb6ef.firebaseio.com/' + actualUser + '/recipes.json',
        recipes
      ).subscribe(response => {
        console.log(response);
      });
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

  storeShoppingList() {
    const actualUser = this.getUser();
    const ingredients = this.shoppingListService.getIngredients();
    this.http.put(
      'https://shoppinglist-bb6ef.firebaseio.com/' + actualUser + '/shoppinglist.json',
      ingredients
    ).subscribe(response => {
      console.log(response);
    });
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
    this.http.put(
      'https://shoppinglist-bb6ef.firebaseio.com/' + actualUser + '/categories.json',
      categories
    ).subscribe(response => {
      console.log(response);
    });
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
