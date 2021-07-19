import {Pipe, PipeTransform} from "@angular/core";
import {WidgetDashboardItem} from "./widget-dashboard-item.interface";

@Pipe({
  name: 'widgetDashboardItem',
  pure: true
})
export class WidgetDashboardItemPipe implements PipeTransform {
  transform(value: any, ...args: any[]): WidgetDashboardItem {
    return value as WidgetDashboardItem;
  }
}
