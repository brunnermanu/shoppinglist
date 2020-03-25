import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a Test',
      'https://res.cloudinary.com/swissmilk/image/fetch/q_auto,f_auto/' +
      'https://api.swissmilk.ch/wp-content/uploads/2019/05/ss-alltagsrezepte-winter-geschmortes-wintergemuese-mit-poulet.jpg'),
  ];
  constructor() { }

  ngOnInit() {
  }

}
