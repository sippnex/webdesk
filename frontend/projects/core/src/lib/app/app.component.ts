import {Component, Input} from '@angular/core';
import {App} from "./app.interface";

@Component({template: ``})
export abstract class AppComponent {
  @Input() public app: App;
}
