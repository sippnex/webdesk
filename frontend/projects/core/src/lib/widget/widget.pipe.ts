import {Pipe, PipeTransform, Type} from "@angular/core";
import {WidgetService} from "./widget.service";
import {WidgetComponent} from "./widget.component";

@Pipe({
  name: 'widget',
  pure: true
})
export class WidgetPipe implements PipeTransform {

  constructor(private widgetService: WidgetService) {
  }

  transform(widgetName: string, ...args: any[]): Type<WidgetComponent> {
    return this.widgetService.getWidget(widgetName)!;
  }
}
