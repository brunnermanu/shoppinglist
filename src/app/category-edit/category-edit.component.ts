import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, NgForm} from '@angular/forms';
import {of, Subscription} from 'rxjs';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Categories} from '../shared/category.model';
import {CategoryService} from './category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit, OnDestroy {

  @ViewChild('f')categoryForm: NgForm;
  subscription: Subscription;
  subscriptionTwo: Subscription;
  editMode = false;
  editedCategoryIndex: number;
  editedItem: Categories;
  categories: Categories[];

  constructor(private shoppingListService: ShoppingListService,
              private categoryService: CategoryService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.categories = this.categoryService.categories;
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
    this.subscription = this.categoryService.categoriesChanged
      .subscribe(
        (categories: Categories[]) => {
          this.categories = categories;
        }
      );
    this.subscriptionTwo = this.categoryService.startedEditing
      .subscribe(
        (index: number) => {
            this.editedCategoryIndex = index;
            this.editMode = true;
            this.editedItem = this.categoryService.getCategory(index);
            this.categoryForm.setValue({
              category: this.editedItem.category,
            });
          }
      );
  }

  onAddCategoryItem(form: NgForm) {
      const value = form.value;
      const newCategory = new Categories(value.category);
      if (this.editMode) {
        this.categoryService.updateCategories(this.editedCategoryIndex, newCategory);
      } else {
        this.categoryService.addCategory(newCategory);
      }
      this.editMode = false;
      form.reset();
    }

  onClear() {
      this.categoryForm.reset();
      this.editMode = false;
    }

  onDelete() {
      this.categoryService.deleteCategory(this.editedCategoryIndex);
      this.onClear();
    }
  onEditCategory(index: number) {
      this.categoryService.startedEditing.next(index);
    }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

}
