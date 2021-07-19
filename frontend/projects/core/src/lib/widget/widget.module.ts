import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { WidgetLoaderComponent } from './widget-loader.component';
import {WidgetDirective} from "./widget.directive";
import {WidgetPipe} from "./widget.pipe";

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    WidgetLoaderComponent,
    WidgetPipe
  ],
  declarations: [
    WidgetLoaderComponent,
    WidgetDirective,
    WidgetPipe
  ]
})
export class WidgetModule {
}
