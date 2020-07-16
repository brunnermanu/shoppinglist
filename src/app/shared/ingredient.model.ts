export class Ingredient {
  constructor(
    public amount: number,
    public unit: string,
    public name: string,
    public category: string
  ) {
  }
}



// import { Category } from '../shared/category.model';
//
// export class Ingredient {
//   constructor(public amount: number, public unit: string, public name: string, public category: Category) {
//     this.amount = amount;
//     this.unit = unit;
//     this.name = name;
//     this.category = category;
//   }
// }
