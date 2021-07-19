import {Component, ComponentFactoryResolver, Input, OnChanges, SimpleChanges, Type, ViewChild} from '@angular/core';
import {WidgetDirective} from "./widget.directive";
import {WidgetComponent} from "./widget.component";

@Component({
  selector: 'widget-loader',
  template: `<ng-template widgetHost></ng-template>`
})
export class WidgetLoaderComponent implements OnChanges {

  @Input() widgetComponent: Type<WidgetComponent>;

  @ViewChild(WidgetDirective, {static: true}) widgetHost!: WidgetDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['widgetComponent']) {
      this.loadComponent();
    }
  }

  private loadComponent(): void {
    if (this.widgetComponent) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.widgetComponent);
      const viewContainerRef = this.widgetHost.viewContainerRef;
      const componentRef = viewContainerRef.createComponent(componentFactory);
      // (<WidgetComponent>componentRef.instance).widget = this.widgetComponent;
    }
  }

}
