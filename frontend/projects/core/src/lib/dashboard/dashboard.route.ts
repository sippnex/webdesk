import { Routes } from '@angular/router';
import {DashboardContainerComponent} from "./dashboard.container";

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardContainerComponent
  },
  {
    path: ':id',
    component: DashboardContainerComponent
  },
];
