import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button-submit',
  templateUrl: './button-submit.component.html',
  styleUrls: ['./button-submit.component.scss']
})
export class ButtonSubmitComponent implements OnInit {
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

  ngOnInit(): void {
  }

}
