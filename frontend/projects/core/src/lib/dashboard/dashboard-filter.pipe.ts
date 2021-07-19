import { Pipe, PipeTransform } from '@angular/core';
import {Dashboard} from "./model/dashboard.interface";

@Pipe({
  name: 'dashboardFilter'
})
export class DashboardFilterPipe implements PipeTransform {

  transform(dashboards: Dashboard[], dashboard: Dashboard): Dashboard[] {
    return dashboards.filter(d => d.id !== dashboard.id);
  }

}
