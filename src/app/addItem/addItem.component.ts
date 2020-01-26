import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './addItem.component.html',
  styleUrls: ['./addItem.component.scss']
})
export class AppComponent {
  title = 'shoppinglist';

  onAddItem() {
    window.alert('You will be notified when the product goes on sale');
  }
}
