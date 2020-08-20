import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';
import {CategoryService} from '../category-edit/category.service';
import {Categories} from './category.model';


@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService,
              private shoppingListService: ShoppingListService,
              private categoryService: CategoryService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(
      'https://shoppinglist-bb6ef.firebaseio.com/recipes.json',
      recipes
    ).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://shoppinglist-bb6ef.firebaseio.com/recipes.json'
      ).pipe(
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
    const ingredients = this.shoppingListService.getIngredients();
    this.http.put(
      'https://shoppinglist-bb6ef.firebaseio.com/shoppinglist.json',
      ingredients
    ).subscribe(response => {
      console.log(response);
    });
  }

  fetchShoppingList() {
    return this.http
      .get<Ingredient[]>(
        'https://shoppinglist-bb6ef.firebaseio.com/shoppinglist.json')
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
    const categories = this.categoryService.getCategories();
    this.http.put(
      'https://shoppinglist-bb6ef.firebaseio.com/categories.json',
      categories
    ).subscribe(response => {
      console.log(response);
    });
  }

  fetchCategories() {
    return this.http
      .get<Categories[]>(
        'https://shoppinglist-bb6ef.firebaseio.com/categories.json')
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
