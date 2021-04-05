import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { of } from 'rxjs';
import {CategoryService} from '../../category-edit/category.service';
import {Categories} from '../../shared/category.model';
import {DataStorageService} from '../../shared/data-storage.service';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  categories: Categories[] = [];
  private form: any;
  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private shoppingListService: ShoppingListService,
              private categoryService: CategoryService,
              private formBuilder: FormBuilder,
              private router: Router,
              private dataStorageService: DataStorageService) {
    this.form = this.formBuilder.group({
      categories: ['']
    });
    // async orders
    of(this.getCategories()).subscribe(categories => {
      this.categories = categories;
      this.form.controls.categories.patchValue(this.categories[0].category);
    });
  }
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params.id;
          this.editMode = params.id != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    // const newRecipe = new Recipe(this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.dataStorageService.storeRecipes();
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
      this.dataStorageService.storeRecipes();
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        amount: new FormControl(null, [
          Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        unit: new FormControl(null),
        name: new FormControl(null, Validators.required),
        category: new FormControl(null)
      })
    );
    this.dataStorageService.storeRecipes();
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
    this.dataStorageService.storeRecipes();
  }

  get controls() { // a getter!
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  getCategories() {
    return this.categoryService.categories;
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              amount: new FormControl(ingredient.amount, [
                Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
              unit: new FormControl(ingredient.unit),
              name: new FormControl(ingredient.name, Validators.required),
              category: new FormControl(ingredient.category)
            }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
  });
  }
}
