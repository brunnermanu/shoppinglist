import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button-x',
  templateUrl: './button-x.component.html',
  styleUrls: ['./button-x.component.scss']
})
export class ButtonXComponent implements OnInit {
  @Input()
  buttonName: string;

  @Input()
  delete: boolean;

  @Input()
  public disabledValue: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
