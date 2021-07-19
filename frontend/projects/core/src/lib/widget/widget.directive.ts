import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[widgetHost]',
})
export class WidgetDirective {

  public viewContainerRef;

  constructor(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }
}
