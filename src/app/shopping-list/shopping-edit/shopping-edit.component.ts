import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, NgForm} from '@angular/forms';
import {of, Subscription} from 'rxjs';
import { Ingredient} from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../category-edit/category.service';
import {Categories} from '../../shared/category.model';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f')shoppingListForm: NgForm;
  subscription: Subscription;
  subscriptionTwo: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  categories: Categories[] = [];
  ingredients: Ingredient[];
  private form: FormGroup;

  constructor(private shoppingListService: ShoppingListService,
              private categoryService: CategoryService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.form = this.formBuilder.group({
      categories: ['']
    });
    // async orders
    of(this.getCategoryList()).subscribe(categories => {
      this.categories = categories;
      this.form.controls.categories.patchValue(this.categories[0].category);
    });
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.shoppingListForm.setValue({
            amount: this.editedItem.amount,
            unit: this.editedItem.unit,
            name: this.editedItem.name,
            category: this.editedItem.category,
          });
        }
      );
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.amount, value.unit, value.name, value.category);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  getCategoryList() {
    return this.categoryService.categories;
  }

  onEditCategory() {
    this.router.navigate(['category-edit']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
