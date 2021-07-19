import {Pipe, PipeTransform} from "@angular/core";
import {AppDashboardItem} from "./app-dashboard-item.interface";

@Pipe({
  name: 'appDashboardItem',
  pure: true
})
export class AppDashboardItemPipe implements PipeTransform {
  transform(value: any, ...args: any[]): AppDashboardItem {
    return value as AppDashboardItem;
  }
}
