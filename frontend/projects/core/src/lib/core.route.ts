import {Routes} from '@angular/router';
import {securityRoutes} from "./security/security.route";
import {AuthGuard} from "./security/auth.guard";
import {dashboardRoutes} from "./dashboard/dashboard.route";
import {appRoutes} from "./app/app.route";
import {CoreComponent} from "./core.component";

export const coreRoutes: Routes = [
  {
    path: '',
    component: CoreComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        children: dashboardRoutes,
      },
      {
        path: 'apps',
        children: appRoutes,
      },
    ],
  },
  {
    path: 'security',
    children: securityRoutes
  }
];
