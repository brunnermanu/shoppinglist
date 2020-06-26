import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('amountInput') amountInputRef: ElementRef;
  @ViewChild('unitInput') unitInputRef: ElementRef;
  @ViewChild('nameInput') nameInputRef: ElementRef;



  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {

  }

  onAddItem() {
    const ingredientAmount = this.amountInputRef.nativeElement.value;
    const ingredientUnit = this.unitInputRef.nativeElement.value;
    const ingredientName = this.nameInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingredientAmount, ingredientUnit, ingredientName);
    this.shoppingListService.addIngredient(newIngredient);
  }

}
