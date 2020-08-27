import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input()
  buttonName: string;

  @Input()
  add: boolean;

  @Input()
  delete: boolean;

  @Input()
  clear: boolean;

  @Input()
  edit: boolean;

  @Input()
  public disabledValue: boolean;

  constructor() { }
}
